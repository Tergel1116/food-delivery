//   const now = Date.now();
//   const newUser = await UserModel.create({
//     email,
//     password: hashedPassword,
//     phoneNumber,
//     address,
//     name,
//     userName,
//     ttl: new Date(now + 1000 * 60 * 5),
//   });

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const refreshToken = (req: Request, res: Response) => {
  const { token: refreshToken } = req.query;

  if (!refreshToken) {
    res.status(400).json({ message: "Token!" });
    return;
  }

  try {
    const decodedToken = jwt.verify(refreshToken as string, JWT_SECRET!) as {
      email: string;
    };

    const newToken = jwt.sign({ email: decodedToken.email }, JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token: newToken,
      user: {
        email: decodedToken.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Token expired or invalid" });
  }
};
