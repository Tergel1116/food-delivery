import { NextFunction, Request, Response } from "express";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers.authorization;
};
