// import { Request, Response } from "express";
// import { UserModel } from "../../models";
// import jwt from "jsonwebtoken";
// import { ResetPasswordVerificationEmail } from "../../utils/passwordResetVerification";

// export const UserPasswordReset = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   try {
//     const user = await UserModel.findOne({ email });

//     // 🔐 Email enumeration хамгаалах
//     if (!user) {
//       res.status(200).json({
//         message: "user not found",
//       });
//       return;
//     }

//     const emailVerifyToken = jwt.sign(
//       {
//         userId: user._id,
//         type: "verify-reset-password",
//       },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "10m" },
//     );
//     console.log("This is forgot password controller");
//     console.log(emailVerifyToken);
//     await ResetPasswordVerificationEmail(
//       email,
//       `${process.env.BACKEND_API}/users/verify-reset-password?token=${emailVerifyToken}`,
//     );

//     return res.status(200).json({
//       message: "Нууц үг сэргээх линк илгээгдлээ.",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

import { Request, Response } from "express";
import { UserModel } from "../../models";
import jwt from "jsonwebtoken";
import { ResetPasswordVerificationEmail } from "../../utils/passwordResetVerification";

export const UserPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If this email exists, a reset link has been sent.",
      });
    }

    const resetToken = jwt.sign(
      {
        userId: user._id,
        type: "password-reset",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" },
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await ResetPasswordVerificationEmail(email, resetLink);

    return res.status(200).json({
      message: "Password reset link sent to email",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
