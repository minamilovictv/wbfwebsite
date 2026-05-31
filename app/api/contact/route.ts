import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  organisation: z.string().max(200).optional(),
  country: z.string().max(100).optional(),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // In production: send via SMTP / Resend / SendGrid
    // For now: log and acknowledge
    console.log("[Contact Form Submission]", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      timestamp: new Date().toISOString(),
    });

    // TODO: replace with actual mail sending:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `[WBF Contact] ${data.subject} – from ${data.name}`,
    //   html: renderContactEmail(data),
    // });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: err.flatten().fieldErrors },
        { status: 422 }
      );
    }
    console.error("[Contact API error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
