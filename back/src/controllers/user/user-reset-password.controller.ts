import { Request, Response } from "express";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const resetPassword = async (req: Request, res: Response) => {
//   try {
//     // const { token, newPassword } = req.body;
//     const { newPassword } = req.body;
//     const {token} = req.query
//     // if (!token || !newPassword) {
//     //   res.status(400).send({ message: "Missing data" });
//     //   return;
//     // }

//     // const {  newPassword } = req.body;
//     if (!newPassword) {
//       res.status(400).send({ message: "Missing data" });
//       return;
//     }

//     // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//     //   userId: string;
//     // };

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//     };

//     const user = await UserModel.findById(decoded.userId);
//     if (!user) {
//       res.status(400).send("User not found");
//       return;
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;

//     await user.save();

//     res.status(200).send({ message: "Password changed succesfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(400).send({ message: "Invalid or expired token" });
//   }
// };


export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Missing data" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
       res.status(404).json({ message: "User not found" });
       return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
