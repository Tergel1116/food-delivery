import { Request, Response } from "express";
import { FoodModel } from "../models";

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;

    const food = await FoodModel.findById(foodId);

    if (!food) {
      res.status(400).send({ message: "Food not found" });
    }

    return res.status(200).send({ message: "successful", data: food });
  } catch (error) {
    console.error(error);
    return res
      .status(404)
      .send({ message: "error fetching food by id", error });
  }
};
