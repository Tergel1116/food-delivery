import { Resend } from "resend";
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyUserEmail = async (reciever: string, verifyLink: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: reciever,
    subject: "Verify user",
    html: `
<div
  style="
    width: 400px;
    height: auto;
    border: 1px solid gray;
    border-radius: 15px;
  "
>
  <div>
    <div
      style="
        margin-top: 20px;
        margin-left: 15%;
        margin-right: 20%;
        font-weight: 600;
        font-family:
          &quot;Lucida Sans&quot;, &quot;Lucida Sans Regular&quot;,
          &quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Geneva,
          Verdana, sans-serif;
        font-size: 20px;
        width: 300px;
      "
    >
      Please verify your email 😁
    </div>
    <div
      style="
        font-family:
          &quot;Lucida Sans&quot;, &quot;Lucida Sans Regular&quot;,
          &quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Geneva,
          Verdana, sans-serif;
        margin-top: 40px;

        width: 300px;
        margin-left: 40px;
        margin-right: 20px;
        width: 310px;
        margin-bottom: 30px;

        text-align: center;
      "
    >
      To create an account , you should verify it first according to our policy.
    </div>
    <a href="${verifyLink}" target="_blank">
      <div
        style="
          font-family:
            &quot;Lucida Sans&quot;, &quot;Lucida Sans Regular&quot;,
            &quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Geneva,
            Verdana, sans-serif;
          margin-top: 40px;
          height: 33px;
          width: 170px;
          background-color: rgb(48, 156, 233);
          padding-top: 15px;
          padding-left: 25px;
          margin-left: 100px;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          text-decoration: none;
        "
      >
        Verify my account
      </div></a
    >
    <div
      style="
        font-family:
          &quot;Lucida Sans&quot;, &quot;Lucida Sans Regular&quot;,
          &quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Geneva,
          Verdana, sans-serif;
        margin-top: 40px;
        width: 300px;
        margin-left: 40px;
        margin-right: 20px;
        width: 310px;
        margin-bottom: 30px;
        color: gray;
        text-align: center;
      "
    >
      You're receiving this email because you requested to create an account in
      Food Delivery. If you are not sure why you're receiving this, please
      contact us by replying to this email.
    </div>
  </div>
</div>


    `,
  });
};
