import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";
import { sendUserConfirmationEmail, sendAdminWaitlistEmail } from "@/lib/email";
import { sendWaitlistToSheet } from "@/lib/sheet";

// Validation schema for waitlist form
const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  profession: z.string().min(1, "Profession is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, email, profession } = parsed.data;

    // Check rate limit using email as identifier
    const rateLimitResult = checkRateLimit(email, "waitlist");
    const headers = getRateLimitHeaders(rateLimitResult);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        { status: 429, headers }
      );
    }

    // Send user confirmation email with download links
    await sendUserConfirmationEmail(name, email).catch((err) =>
      console.error("User email error:", err)
    );

    // Send admin notification email
    await sendAdminWaitlistEmail({ name, email, profession }).catch(
      (err) => console.error("Admin email error:", err)
    );

    // Save to SheetDB
    await sendWaitlistToSheet({ name, email, profession }).catch(
      (err) => console.error("SheetDB error:", err)
    );

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist! Check your email for download links.",
      },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist. Please try again." },
      { status: 500 }
    );
  }
}