import { Request, Response } from "express";
import { CategoryModel } from "../models";

export const getFoodCategory = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return res.status(200).send({ message: "succesful", data: categories });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ message: "Error fetching categories", error });
  }
};
