import axios from "axios";

export const emailSender = async (data: {
  type: string;
  email: string;
  otp?: string;
  resetLink?: string;
}) => {
  try {
    let subject = "";
    let htmlContent = "";
    if (data.type === "OTP") {
      subject = "Sign Up OTP";
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #333333; font-size: 28px; font-weight: bold;">Verify Your Email</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 20px 40px; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.5;">
                Your OTP for ProFile is:
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <div style="display: inline-block; padding: 20px 40px; background-color: #f8f9fa; border: 2px dashed #007bff; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 8px;">${data.otp}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                Enter this code to complete your verification. If you did not request this code, please ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #999999; font-size: 14px; text-align: center;">
                This code will expire in 5 minutes for security purposes.
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
      // htmlContent = `<html><body><p>Your OTP for ProFile is <strong>${data.otp}</strong></p></body></html>`;
    } else if (data.type === "FORGOT") {
      subject = "We received a request to reset your password";
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; color: #333333; font-size: 28px; font-weight: bold;">Change Password</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.5;">
                Set a new password for your ProFile account. If you did not request for this, ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Button -->
          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <a href="${data.resetLink}" style="display: inline-block; padding: 14px 32px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Change Password</a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #999999; font-size: 14px; text-align: center;">
                This link will expire in 1 hour for security purposes.
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
    }
    const sending = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "ProFile", email: "pro.file.mailer24@gmail.com" },
        to: [{ email: `${data.email}` }],
        subject,
        htmlContent,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": `${process.env.BREVO_API_KEY}`,
        },
      }
    );
    return sending;
  } catch (error) {
    throw new Error("Email sending failed");
  }
};
