import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, interest, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Server-side audit log for inbound enquiry
    console.log("[NexooAI Inbound Lead]", {
      timestamp: new Date().toISOString(),
      name,
      company: company || "N/A",
      email,
      phone: phone || "N/A",
      interest: interest || "General Inquiry",
      messageLength: message.length,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting NexooAI! Your enquiry has been received. Our solutions team will review your requirements and get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[NexooAI Contact Error]", error);
    return NextResponse.json(
      { error: "Failed to process message. Please try again or reach out directly via email." },
      { status: 500 }
    );
  }
}
