import { Request, Response } from "express";
import { CategoryModel } from "../models";

export const createFoodCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName || typeof categoryName !== "string") {
      res.status(400).send({ message: "categoryName is required" });
    }
    const exists = await CategoryModel.findOne({
      categoryName: categoryName.trim(),
    });
    if (exists) {
      res.status(400).send({ message: "category already exists" });
      return;
    }

    const category = await CategoryModel.create({ categoryName });
    return res
      .status(200)
      .send({ message: "category created ", data: category });
  } catch (error) {}
};
