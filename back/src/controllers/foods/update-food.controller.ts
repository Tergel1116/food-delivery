import { Request, Response } from "express";
import { FoodModel } from "../models";

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;

    const updated = await FoodModel.findByIdAndUpdate(foodId, req.body, {
      new: true,
    });
    if (!updated) {
      res.status(400).send({ message: "food not found" });
      return;
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "error updating food", error });
  }
};
