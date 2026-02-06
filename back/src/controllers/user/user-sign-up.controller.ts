import { Request, Response } from "express";
import { UserModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../utils/mail-utils";

export const UserSignUp = async (req: Request, res: Response) => {
  try {
    const { password, email, phoneNumber, address, name, userName } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(400).send({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const now = Date.now();
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      name,
      userName,
      ttl: new Date(now + 1000 * 60 * 5),
    });
    const token = jwt.sign(
      { email: newUser.email, _id: newUser._id },
      process.env.JWT_SECRET!,
    );

    await verifyUserEmail(
      email,
      `${process.env.BACKEND_API}/users/verify-user?token=${token}`,
    );

    res
      .status(200)
      .send({ message: `User created successfully`, data: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "User creating process failed" });
  }
};
