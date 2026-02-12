import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import { Resend } from "resend";

configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const ResetPasswordVerificationEmail = async (
  reciever: string,
  verifyLink: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: reciever,
    subject: "Нууц үг сэргээх баталгаажуулах линк",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f7f6;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 15px;">
        <h2 style="color: #333;">Нууц үг сэргээх</h2>
        <p>Таны баталгаажуулах код:</p>
        <a
        href="${verifyLink}"
        style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; padding: 20px; border: 2px dashed #007bff; display: inline-block;">
         mai
        </a>
        <p style="color: #888; margin-top: 20px;">Энэ код 10 минутын дараа хүчингүй болно.</p>
      </div>
    </div>
    
    `,
  });
};
