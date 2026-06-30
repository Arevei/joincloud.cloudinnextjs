import dotenv from "dotenv";

dotenv.config();

const SHEET_WAITLIST_URL = process.env.SHEET_WAITLIST_URL;
const SHEET_FEEDBACK_URL = process.env.SHEET_FEEDBACK_URL;

export interface WaitlistData {
  name: string;
  email: string;
  profession: string;
}

export interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

/**
 * Send waitlist data to SheetDB
 */
export async function sendWaitlistToSheet(data: WaitlistData): Promise<boolean> {
  if (!SHEET_WAITLIST_URL) {
    console.log("SHEET_WAITLIST_URL not configured, skipping sheet submission");
    return false;
  }

  try {
    const payload = {
      data: [
        {
          Name: data.name,
          Email: data.email,
          Profession: data.profession,
          "Sheet Name": "Waitlist",
          Timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
      ],
    };

    const response = await fetch(SHEET_WAITLIST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`SheetDB responded with status: ${response.status}`);
    }

    console.log("Waitlist data sent to SheetDB successfully");
    return true;
  } catch (error) {
    console.error("Error sending waitlist to SheetDB:", error);
    return false;
  }
}

/**
 * Send feedback data to SheetDB
 */
export async function sendFeedbackToSheet(data: FeedbackData): Promise<boolean> {
  if (!SHEET_FEEDBACK_URL) {
    console.log("SHEET_FEEDBACK_URL not configured, skipping sheet submission");
    return false;
  }

  try {
    const payload = {
      data: [
        {
          Name: data.name,
          Email: data.email,
          Message: data.message,
          "Sheet Name": "Feedback",
          Timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
      ],
    };

    const response = await fetch(SHEET_FEEDBACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`SheetDB responded with status: ${response.status}`);
    }

    console.log("Feedback data sent to SheetDB successfully");
    return true;
  } catch (error) {
    console.error("Error sending feedback to SheetDB:", error);
    return false;
  }
}