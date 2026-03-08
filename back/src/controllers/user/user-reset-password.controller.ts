// import { Request, Response } from "express";
// import { UserModel } from "../../models";
// import bcrypt from "bcrypt";
// import jwt, { decode } from "jsonwebtoken";

// export const resetPassword = async (req: Request, res: Response) => {
//   try {
//     const { token, newPassword } = req.body;

//     if (!token || !newPassword) {
//       res.status(400).json({ message: "Missing data" });
//       return;
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       type: string;
//     };
//     // console.log(decoded)
//     if (decoded.type !== "password-reset") {
//       res.status(400).json({ message: "Invalid token type" });
//       return;
//     }

//     const user = await UserModel.findById(decoded.userId);
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;

//     await user.save();

//     return res.status(200).json({
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "Invalid or expired token",
//     });
//   }
// };

import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      type: string;
    };

    if (decoded.type !== "password-reset") {
      return res.status(400).json({
        message: "Invalid token type",
      });
    }

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password successfully reset",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
