import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";
import { sendAdminFeedbackEmail } from "@/lib/email";
import { sendFeedbackToSheet } from "@/lib/sheet";

// Validation schema for feedback form
const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { name, email, message, phone } = parsed.data;

    // Check rate limit using email as identifier
    const rateLimitResult = checkRateLimit(email, "feedback");
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

    // Send admin notification email (no user email for feedback)
    await sendAdminFeedbackEmail({ name, email, message, phone }).catch(
      (err) => console.error("Admin email error:", err)
    );

    // Save to SheetDB
    await sendFeedbackToSheet({ name, email, message, phone }).catch(
      (err) => console.error("SheetDB error:", err)
    );

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your feedback! We've received your message.",
      },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback. Please try again." },
      { status: 500 }
    );
  }
}