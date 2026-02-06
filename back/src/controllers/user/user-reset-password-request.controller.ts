// import { Request, Response } from "express";
// import { UserModel } from "../models";
// import bcrypt from "bcrypt";
// import { ResetPasswordVerificationEmail } from "../../utils/passwordResetVerification";
// export const UserPasswordReset = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not fount" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await userOTPModel.create({ userId: user._id, otp: otpCode });

//     await ResetPasswordVerificationEmail(email, otpCode);

//     return res.status(200).json({ message: "Success" });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
