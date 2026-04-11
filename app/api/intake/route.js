import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();

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
      full_payload: body,
      status: "new",
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
