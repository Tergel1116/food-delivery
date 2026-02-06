import { Request, Response } from "express";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserSignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).send({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid Password" });
      return;
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET!,
    );
    console.log(user);
    res.status(200).json({
      message: "Sign-in successful",
      success: true,
      data: user,
      token: token,
    });

    res.status(200).send({ message: "Signed in successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error signing in" });
  }
};

// import { Request, Response } from "express";
// import UserModel from "../../schema/user.model";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const signInController = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { email: user.email, _id: user._id },
//       process.env.JWT_SECRET!,
//     );

//     res.status(200).json({
//       message: "Sign-in successful",
//       success: true,
//       data: user,
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };
