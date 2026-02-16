import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Query } from "mongoose";
import { UserModel } from "../models";

export const verifyResetPasswordRequest = async (
  req: Request,
  res: Response,
) => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ message: "Токен байхгүй байна" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }
    res.status(200).json({ message: "Токен хүчинтэй", token });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Токен хүчингүй эсвэл хугацаа нь дууссан байна" });
  }
};
