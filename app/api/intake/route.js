export async function POST(request) {
  try {
    const body = await request.json();

    console.log("New case builder intake:", body);

    return Response.json({
      success: true,
      message: "Intake received successfully",
      data: body,
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
