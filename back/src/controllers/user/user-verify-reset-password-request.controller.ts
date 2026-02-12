import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Query } from "mongoose";

export const verifyResetPasswordRequest = (req: Request, res: Response) => {
    const token = req.query.token as string;
    console.log(token);
    try {

  } catch (error) {

  }
};
