import nodemailer from "nodemailer";

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.resend.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "rishabh@arevei.com";
const FROM_EMAIL = process.env.SMTP_FROM || "info@joincloud.in";

// User confirmation email template for waitlist
const getUserConfirmationTemplate = (name: string) => {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to JoinCloud Beta - You're In!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000405; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000405; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #00080A; border-radius: 16px; border: 1px solid #001C25; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #0A1214 0%, #001C25 100%); padding: 32px; text-align: center; border-bottom: 1px solid #001C25;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em;">
                <span style="color: #FFFFFF;">JOIN</span><span style="color: #2FB7FF;">CLOUD</span>
              </h1>
              <p style="margin: 8px 0 0; color: #8B9CA3; font-size: 14px;">Welcome to Beta Access</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; text-align: center;">
              <span style="display: inline-block; background-color: rgba(34, 197, 94, 0.1); color: #22C55E; font-size: 11px; font-weight: 600; padding: 6px 16px; border-radius: 99px; letter-spacing: 0.1em; text-transform: uppercase;">✅ You're on the list!</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px; text-align: center;">
              <h2 style="margin: 0 0 16px; color: #FFFFFF; font-size: 24px; font-weight: 600;">Hi ${name}! 🎉</h2>
              <p style="margin: 0 0 24px; color: #8B9CA3; font-size: 16px; line-height: 1.6;">
                You're officially on the JoinCloud Beta waitlist. We're excited to have you on board!
              </p>
              <p style="margin: 0 0 32px; color: #8B9CA3; font-size: 15px; line-height: 1.6;">
                Download JoinCloud now and start sharing files directly from your system — no upload, no wait, just instant sharing.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px; text-align: center;">
              <p style="margin: 0 0 16px; color: #8B9CA3; font-size: 14px;">Download JoinCloud Beta:</p>
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 8px 0 0;">
                    <a href="https://github.com/vinay-kumar-shakyawar/joincloud/releases/download/v0.3.6/JoinCloud.Setup.0.3.6.exe" style="display: inline-block; background-color: #2FB7FF; color: #000000; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none;">⬇️ Download for Windows</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0 0;">
                    <a href="https://github.com/vinay-kumar-shakyawar/joincloud/releases/download/v0.3.6/JoinCloud-0.3.6-universal.dmg" style="display: inline-block; background-color: #2FB7FF; color: #000000; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none;">⬇️ Download for macOS</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; text-align: center;">
              <p style="margin: 0; color: #5B7A85; font-size: 12px;">Registered on ${timestamp} (IST)<br>JoinCloud Beta Program</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              <p style="margin: 0; color: #5B7A85; font-size: 12px;">
                Questions? Reply to this email or reach us at <a href="mailto:info@joincloud.in" style="color: #2FB7FF;">info@joincloud.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Admin notification email template for waitlist
const getAdminWaitlistTemplate = (data: { name: string; email: string; profession: string }) => {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Waitlist Signup - JoinCloud</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000405; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; width: 100%;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000405; padding: 40px 20px; width: 100%;">
    <tr>
      <td align="center">
        <table width="90%" cellpadding="0" cellspacing="0" style="background-color: #00080A; border-radius: 16px; border: 1px solid #001C25; width: 100%; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #0A1214 0%, #001C25 100%); padding: 32px; text-align: center; border-bottom: 1px solid #001C25;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em;">
                <span style="color: #FFFFFF;">JOIN</span><span style="color: #2FB7FF;">CLOUD</span>
              </h1>
              <p style="margin: 8px 0 0; color: #8B9CA3; font-size: 14px;">New Beta Waitlist Signup</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 0; text-align: center;">
              <span style="display: inline-block; background-color: rgba(47, 183, 255, 0.1); color: #2FB7FF; font-size: 11px; font-weight: 600; padding: 6px 16px; border-radius: 99px; letter-spacing: 0.1em; text-transform: uppercase;">🚀 Beta Access Request</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px;">
              <div style="background-color: #0A1214; border-radius: 12px; padding: 24px; border: 1px solid #1A2E35;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1A2E35;">
                      <span style="color: #8B9CA3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Name</span>
                      <p style="margin: 4px 0 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${data.name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1A2E35;">
                      <span style="color: #8B9CA3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                      <p style="margin: 4px 0 0; color: #2FB7FF; font-size: 16px; font-weight: 500;">${data.email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #8B9CA3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Profession</span>
                      <p style="margin: 4px 0 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${data.profession}</p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              <p style="margin: 0; color: #5B7A85; font-size: 12px;">Received on ${timestamp} (IST)<br>JoinCloud Beta Waitlist</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Admin notification email template for feedback
const getAdminFeedbackTemplate = (data: { name: string; email: string; message: string }) => {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Feedback - JoinCloud</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000405; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000405; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #00080A; border-radius: 16px; border: 1px solid #001C25; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #0A1214 0%, #001C25 100%); padding: 32px; text-align: center; border-bottom: 1px solid #001C25;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em;">
                <span style="color: #FFFFFF;">JOIN</span><span style="color: #2FB7FF;">CLOUD</span>
              </h1>
              <p style="margin: 8px 0 0; color: #8B9CA3; font-size: 14px;">New User Feedback</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 0; text-align: center;">
              <span style="display: inline-block; background-color: rgba(124, 58, 237, 0.1); color: #A78BFA; font-size: 11px; font-weight: 600; padding: 6px 16px; border-radius: 99px; letter-spacing: 0.1em; text-transform: uppercase;">💬 Feedback Received</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px;">
              <div style="background-color: #0A1214; border-radius: 12px; padding: 24px; border: 1px solid #1A2E35;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1A2E35;">
                      <span style="color: #8B9CA3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Name</span>
                      <p style="margin: 4px 0 0; color: #FFFFFF; font-size: 16px; font-weight: 500;">${data.name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1A2E35;">
                      <span style="color: #8B9CA3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
                      <p style="margin: 4px 0 0; color: #2FB7FF; font-size: 16px; font-weight: 500;">${data.email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #8B9CA3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</span>
                      <p style="margin: 8px 0 0; color: #FFFFFF; font-size: 15px; line-height: 1.6;">${data.message}</p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              <p style="margin: 0; color: #5B7A85; font-size: 12px;">Received on ${timestamp} (IST)<br>JoinCloud Feedback Form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Send email to user (waitlist confirmation with download links)
export const sendUserConfirmationEmail = async (name: string, email: string) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping user confirmation email");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"JoinCloud" <${FROM_EMAIL}>`,
      to: email,
      subject: "🎉 You're on the list! Download JoinCloud Beta Now",
      html: getUserConfirmationTemplate(name),
    });
    console.log("User confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending user confirmation email:", error);
    throw error;
  }
};

// Send admin notification for waitlist
export const sendAdminWaitlistEmail = async (data: { name: string; email: string; profession: string }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping admin waitlist email");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"JoinCloud" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `🚀 New Beta Waitlist Signup: ${data.name}`,
      html: getAdminWaitlistTemplate(data),
    });
    console.log("Admin waitlist notification sent");
  } catch (error) {
    console.error("Error sending admin waitlist email:", error);
    throw error;
  }
};

// Send admin notification for feedback
export const sendAdminFeedbackEmail = async (data: { name: string; email: string; message: string }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("SMTP not configured, skipping admin feedback email");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"JoinCloud" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `💬 New Feedback from ${data.name}`,
      html: getAdminFeedbackTemplate(data),
    });
    console.log("Admin feedback notification sent");
  } catch (error) {
    console.error("Error sending admin feedback email:", error);
    throw error;
  }
};