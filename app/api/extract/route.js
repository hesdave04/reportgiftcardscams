// app/api/extract/route.js
// AI-powered story extraction - parses a victim's story into structured case data
import rateLimit from "@/utils/rate-limit";

const limiter = rateLimit({ window: 60, limit: 20 });

const SYSTEM_PROMPT = `You are an AI assistant for ScamComplaints.org, a scam reporting platform. Your role is to extract structured fraud case data from a victim's story.

Given a victim's description of what happened, extract the following fields. Only include fields you are confident about from the text. Do NOT guess or hallucinate — if a field isn't mentioned, set it to null.

Return a JSON object with these fields:
{
  "scamType": string | null — one of: "Romance Scam", "Gift Card Scam", "Crypto Scam", "Impersonation Scam", "Tech Support Scam", "Marketplace Scam", "Investment Scam", "Employment Scam", "Banking Scam", "Other",
  "platforms": string[] — platforms mentioned (e.g., "Facebook", "Instagram", "WhatsApp", "Telegram", "Text Message", "Email", "Phone Call", "Dating App", "TikTok", "Other"),
  "sentMoney": "Yes" | "No" | null,
  "sentPersonalInfo": "Yes" | "No" | null,
  "amount": number | null — total dollar amount lost,
  "paymentMethods": string[] — methods used (e.g., "Gift Card", "Bank Transfer", "Wire Transfer", "Crypto", "Cash App", "Venmo", "PayPal", "Zelle", "Cash", "Other"),
  "startDate": string | null — ISO date (YYYY-MM-DD) when scam began,
  "paymentDate": string | null — ISO date when money/info was sent,
  "realizedDate": string | null — ISO date when victim realized it was a scam,
  "suspectName": string | null,
  "suspectEmail": string | null,
  "suspectPhone": string | null,
  "suspectUsername": string | null,
  "suspectWallet": string | null,
  "suspectWebsite": string | null,
  "confidence": number — 0 to 1, your overall confidence in the extraction
}

Rules:
- Only extract what is explicitly stated or very strongly implied.
- For dates, convert relative references ("last month", "3 weeks ago") to approximate ISO dates based on today's date.
- For amounts, extract the total lost even if paid in multiple installments.
- Return ONLY valid JSON. No markdown, no explanation, no wrapping.`;

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "0.0.0.0";
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { story } = await request.json();

    if (!story || story.trim().length < 20) {
      return Response.json(
        { success: false, error: "Story is too short to extract data from." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, error: "AI extraction not configured." },
        { status: 501 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Today's date is ${today}.\n\nVictim's story:\n\n${story.slice(0, 5000)}`,
          },
        ],
        temperature: 0.1,
        max_tokens: 800,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      return Response.json(
        { success: false, error: "AI extraction failed." },
        { status: 502 }
      );
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      return Response.json(
        { success: false, error: "No extraction result." },
        { status: 502 }
      );
    }

    const extracted = JSON.parse(content);

    return Response.json({
      success: true,
      extracted,
    });
  } catch (error) {
    console.error("Extract route error:", error);
    return Response.json(
      { success: false, error: "Failed to process extraction." },
      { status: 500 }
    );
  }
}
