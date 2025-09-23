// lib/email.ts
import { Resend } from "resend";

const resend = new Resend("re_X8mBm7hT_Gee4MBpgLQHr6J7b9ywcqywB");

export async function sendOtpEmail(to: string, otp: string) {
  console.log({ to, otp });
  await resend.emails.send({
    from: "pro.file.mailer24@gmail.com",
    to: "turayevshahzodbek@gmail.com",
    subject: "Your OTP Code",
    html: `<p>Your OTP is: <b>${otp}</b></p>`,
  });
}
