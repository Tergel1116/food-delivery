import { Request, Response } from "express";
import { FoodModel } from "../models";

export const createFood = async (req: Request, res: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = req.body;

    if (!foodName || !price || !category) {
      res.status(400).send({ message: "required field is missing" });
      return;
    }

    const food = await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });
    return res
      .status(200)
      .send({ message: "Food created successfully", data: food });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error creating food", error });
  }
};
