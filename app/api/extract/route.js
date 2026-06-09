/**
 * POST /api/extract
 * AI-powered story extraction — parses a victim's narrative and returns
 * structured scam details (type, platforms, payment methods, amounts, dates, suspect info).
 *
 * Requires OPENAI_API_KEY env var. Returns { available: false } if not configured.
 */

import rateLimit from "@/utils/rate-limit";

const limiter = rateLimit({ window: 60, limit: 20 });

const SYSTEM_PROMPT = `You are an assistant that extracts structured scam report details from a victim's story.
Given the victim's narrative, extract the following fields. Only include fields you are confident about.
Return a JSON object with these keys (all optional):
- scamType: one of "Romance Scam", "Gift Card Scam", "Crypto / Investment Scam", "Impersonation Scam", "Tech Support Scam", "Online Shopping Scam", "Employment Scam", "Banking / Phishing Scam", "Government Impersonation", "Other"
- platforms: array of contact methods from: "Facebook", "Instagram", "WhatsApp", "Telegram", "Text / SMS", "Email", "Phone Call", "Dating App", "TikTok", "Website", "In Person", "Other"
- sentMoney: "Yes" or "No"
- amount: number (total USD lost, no currency symbol)
- paymentMethods: array from: "Gift Card", "Bank / Wire Transfer", "Cryptocurrency", "Cash App", "Venmo", "PayPal", "Zelle", "Cash", "Check", "Other"
- startDate: ISO date string (YYYY-MM-DD) if mentioned
- paymentDate: ISO date string if mentioned
- realizedDate: ISO date string if mentioned
- suspectName: string
- suspectEmail: string
- suspectPhone: string
- suspectUsername: string
- suspectWallet: string (crypto wallet address)
- suspectWebsite: string

Only include fields where you have reasonable confidence. Omit uncertain fields entirely.
Return ONLY valid JSON, no markdown or explanation.`;

export async function POST(request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ available: false, message: "AI extraction not configured" });
    }

    const ip = request.headers.get("x-forwarded-for") || "0.0.0.0";
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return Response.json({ error: "Too many requests" }, { status: 429 });
    }

    const { story } = await request.json();
    if (!story || story.trim().length < 10) {
      return Response.json({ error: "Story too short for extraction" }, { status: 400 });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: story.slice(0, 4000) },
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("OpenAI API error:", res.status, text);
      return Response.json({ available: false, error: "AI service unavailable" }, { status: 502 });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return Response.json({ available: false, error: "No extraction result" });
    }

    const extracted = JSON.parse(content);
    return Response.json({ available: true, extracted });
  } catch (error) {
    console.error("Extract route error:", error);
    return Response.json({ available: false, error: "Extraction failed" }, { status: 500 });
  }
}
