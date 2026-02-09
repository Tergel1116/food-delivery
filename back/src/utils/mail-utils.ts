// import nodemailer from "nodemailer";
// import { configDotenv } from "dotenv";

// configDotenv();

// const { AUTH_EMAIL, AUTH_PASS } = process.env;

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: AUTH_EMAIL,
//     pass: AUTH_PASS,
//   },
// });

// export const verifyUserEmail = async (reciever: string, verifyLink: string) => {
//   await transport.sendMail({
//     from: `Food Delivery ${AUTH_EMAIL}`,
//     to: reciever,
//     subject: "Verify user",
//     html: `

// <div
//   style="
//     width: 100vw;
//     height: 100vh;
//     background-color: aqua;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   "
// >
//   <div
//     style="
//       display: flex;
//       flex-direction: column;
//       width: 300px;
//       height: 400px;
//       padding-right: 40px;
//       padding-left: 40px;
//       padding-top: 60px;
//       padding-bottom: 0px;
//       align-items: center;
//       background-color: red;
//       border-radius: 10px;
//       gap: 30px;
//     "
//   >
//     <div
//       style="
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//       "
//     >
//       <p
//         style="
//           font-family:
//             &quot;Trebuchet MS&quot;, &quot;Lucida Sans Unicode&quot;,
//             &quot;Lucida Grande&quot;, &quot;Lucida Sans&quot;, Arial,
//             sans-serif;
//         "
//       >
//         Verify your account
//       </p>
//       <p style="margin-top: 0px">↓</p>
//     </div>
//     <div
//       style="
//         width: 200px;
//         height: 150px;
//         border-radius: 10px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         flex-direction: column;
//         border: 2px, solid, grey;
//       "
//     >
//       <a
//         href="${verifyLink}"
//         target="_blank"
//         style="
//           font-size: 18px;
//           color: blue;
//           display: flex;
//           align-items: center;
//           text-align: center;
//           font-family:
//             &quot;Gill Sans&quot;, &quot;Gill Sans MT&quot;, Calibri,
//             &quot;Trebuchet MS&quot;, sans-serif;
//         "
//         >Press here to verify your account</a
//       >
//     </div>
//   </div>
// </div>

//     `,
//   });
// };
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

// const { AUTH_EMAIL, AUTH_PASS } = process.env;

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: AUTH_EMAIL,
//     pass: AUTH_PASS,
//   },
// });

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyUserEmail = async (reciever: string, verifyLink: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: reciever,
    subject: "Verify user",
    html: `

  <html>
  <body style="margin: 0; padding: 0; background-color: #e6f7f7">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0">
          <table
            width="320"
            cellpadding="0"
            cellspacing="0"
            style="border-radius: 10px; border: 1px solid gray"
          >
            <tr>
              <td align="center" style="padding: 40px 30px">
                <p
                  style="
                    margin: 0;
                    font-size: 20px;
                    font-family: Arial, sans-serif;
                    color: #000;
                  "
                >
                  Verify your account
                </p>

                <p style="margin: 10px 0">↓</p>

                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    margin-top: 20px;
                    border: 2px solid #888;
                    border-radius: 8px;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 15px">
                      <a
                        href="${verifyLink}"
                        target="_blank"
                        style="
                          font-size: 16px;
                          font-family: Arial, sans-serif;
                          color: #0066ff;
                          display: inline-block;
                        "
                      >
                        Press here to verify<br />
                        your account
                      </a>
                    </td>
                  </tr>
                </table>
                <p>
                    This link will expire after 5 minutes !
                 </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `,
  });
};
