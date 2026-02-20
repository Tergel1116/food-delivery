import { Request, Response } from "express";
import { FoodModel } from "../models";

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;

    const deleted = await FoodModel.findByIdAndDelete(foodId);

    if (!deleted) {
      res.status(400).send({ message: "Food not found" });
      return;
    }

    return res.status(200).send({ message: "food deleted", data: deleted });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Error deleting food", error });
  }
};
