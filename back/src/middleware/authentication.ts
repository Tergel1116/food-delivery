// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";

// type JwtPayload = {
//   _id: string;
//   email: string;
//   role?: "USER" | "ADMIN";
// };

// export const authentication = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const header = req.headers.authorization;

//     if (!header || !header.startsWith("Bearer ")) {
//       res.status(401).send({ message: "Unauthorized" });
//       return;
//     }

//     const token = header.split(" ")[1];
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//       throw new Error("JWT_SECRET is not defined in environment variables");
//     }
//     const decoded = jwt.verify(token, secret) as JwtPayload;

//     (req as Request & { user?: JwtPayload }).user = decoded;
//     (req as any).user = decoded;
//     return next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).send({ message: "Invalid or expired token" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Login hiih erhgui bn" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret =
      process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || "hello";

    const decoded = jwt.verify(token as string, secret);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({
      message: "Token huchingui esvel hugatsaa duussan",
      error: error.message,
    });
  }
};
