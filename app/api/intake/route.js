import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyRecaptchaV2 } from "@/lib/recaptcha";
import rateLimit from "@/utils/rate-limit";

const limiter = rateLimit({ window: 60, limit: 10 });

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "0.0.0.0";

    // Rate limiting
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Verify reCAPTCHA if configured
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey) {
      const token = body.recaptchaToken;
      if (!token) {
        return Response.json(
          { success: false, error: "reCAPTCHA verification required" },
          { status: 400 }
        );
      }
      const { ok: captchaOk } = await verifyRecaptchaV2(token, ip);
      if (!captchaOk) {
        return Response.json(
          { success: false, error: "reCAPTCHA verification failed" },
          { status: 403 }
        );
      }
    }

    const client = getSupabaseAdmin();

    const payload = {
      story: body.story || null,
      scam_type: body.scamType || null,
      platforms: Array.isArray(body.platforms) ? body.platforms : [],
      sent_money: body.sentMoney || null,
      sent_personal_info: body.sentPersonalInfo || null,
      amount: body.amount ? Number(body.amount) : null,
      payment_methods: Array.isArray(body.paymentMethods)
        ? body.paymentMethods
        : [],
      start_date: body.startDate || null,
      payment_date: body.paymentDate || null,
      realized_date: body.realizedDate || null,
      suspect_name: body.suspectName || null,
      suspect_email: body.suspectEmail || null,
      suspect_phone: body.suspectPhone || null,
      suspect_username: body.suspectUsername || null,
      suspect_wallet: body.suspectWallet || null,
      suspect_website: body.suspectWebsite || null,
      state: body.state || null,
      full_payload: body,
      status: "new",
      source: "user_submitted",
    };

    const { data, error } = await client
      .from("case_intakes")
      .insert([payload])
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return Response.json(
        {
          success: false,
          error: "Failed to save report to database",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Report saved successfully",
      intakeId: data.id,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("Intake route error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to process intake",
      },
      { status: 500 }
    );
  }
}
