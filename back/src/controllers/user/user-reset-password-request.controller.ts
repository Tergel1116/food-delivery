// import { Request, Response } from "express";
// import { UserModel } from "../models";
// import bcrypt from "bcrypt";
// import { ResetPasswordVerificationEmail } from "../../utils/passwordResetVerification";
// import jwt from "jsonwebtoken";

// export const UserPasswordReset = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       res.status(400).json({ message: "User not fount" });
//       return;
//     }

//     const resetToken = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET as string,
//       {
//         expiresIn: "10m",
//       },
//     );
//     // res
//     //   .status(200)
//     //   .send({ message: "Reset token generated", data: resetToken });
//     // const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//     // await ResetPasswordVerificationEmail(email, otpCode);

//     await ResetPasswordVerificationEmail(
//       email,
//       `${process.env.BACKEND_API}/users/verify-reset-token?token=${resetToken}`,
//     );

//     return res
//       .status(200)
//       .json({ message: "Нууц үг сэргээх линк и-мэйлээр илгээгдлээ." });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

import { Request, Response } from "express";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";
import { ResetPasswordVerificationEmail } from "../../utils/passwordResetVerification";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    // 🔐 Email enumeration хамгаалах
    if (!user) {
      return res.status(200).json({
        message: "Хэрэв бүртгэлтэй бол линк илгээгдэнэ.",
      });
    }

    const emailVerifyToken = jwt.sign(
      {
        userId: user._id,
        type: "email-verify-reset",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" },
    );

    await ResetPasswordVerificationEmail(
      email,
      `${process.env.BACKEND_API}/users/verify-reset-token?token=${emailVerifyToken}`,
    );

    return res.status(200).json({
      message: "Нууц үг сэргээх линк илгээгдлээ.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
