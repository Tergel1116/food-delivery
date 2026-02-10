import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    const hundredYears = new Date();
    hundredYears.setFullYear(hundredYears.getFullYear() + 100);

    const verifiedUser = await UserModel.findOneAndUpdate(
      { email: decodedToken.email },
      {
        $set: { isVerified: true, ttl: hundredYears },
      },
      { new: true },
    );

    if (verifiedUser) {
      res.status(200).json({
        message: "Email veryfied successfully",
        data: verifiedUser,
      });
      return;
    } else {
      res.status(400).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Internal server error", error });
  }
};

// const token = req.query.token as string;

// const decode = verify(token, process.env.JWT_SECRET as string);

// const userId = req.query._id;
