import rateLimit from "@/utils/rate-limit";

const limiter = rateLimit({ window: 60, limit: 15 });

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "0.0.0.0";

    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return Response.json(
        { success: false, error: "Too many requests." },
        { status: 429 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, error: "OCR service not configured." },
        { status: 501 }
      );
    }

    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return Response.json(
        { success: false, error: "imageUrl is required." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.1,
        max_tokens: 1000,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are an OCR and receipt analysis assistant for a scam reporting platform.
Analyze the provided image and extract any relevant information.

Return a JSON object with these fields (use null for anything not found):
{
  "rawText": "All visible text from the image",
  "amount": number or null (total amount on receipt/transaction),
  "currency": "USD" or other currency code,
  "paymentMethod": "Gift Card" | "Bank Transfer" | "Wire Transfer" | "Crypto" | "Cash App" | "Venmo" | "PayPal" | "Zelle" | "Cash" | null,
  "giftCardBrand": string or null (e.g. "iTunes", "Google Play", "Amazon"),
  "cardNumber": string or null (any card/transaction numbers visible),
  "date": "YYYY-MM-DD" or null,
  "merchantName": string or null,
  "transactionId": string or null,
  "recipientInfo": string or null (any recipient/payee details),
  "documentType": "receipt" | "screenshot" | "conversation" | "bank_statement" | "gift_card" | "other",
  "confidence": number between 0 and 1
}`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all relevant information from this image. It may be a receipt, screenshot, gift card, bank statement, or conversation related to a scam report.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high",
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenAI Vision error:", response.status, errBody);
      return Response.json(
        { success: false, error: "OCR analysis failed." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return Response.json(
        { success: false, error: "No content returned from OCR." },
        { status: 502 }
      );
    }

    let extracted;
    try {
      extracted = JSON.parse(content);
    } catch {
      extracted = { rawText: content, confidence: 0.3 };
    }

    return Response.json({ success: true, extracted });
  } catch (error) {
    console.error("OCR route error:", error);
    return Response.json(
      { success: false, error: "Failed to process OCR request." },
      { status: 500 }
    );
  }
}
