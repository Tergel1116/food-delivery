import { Request, Response } from "express";
import { FoodModel } from "../models";

export const getFood = async (req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find().populate("category");
    return res.status(200).send({ message: "succesfull", data: foods });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Error fetching food", error });
  }
};
