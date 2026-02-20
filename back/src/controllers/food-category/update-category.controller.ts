import { Request, Response } from "express";
import { CategoryModel } from "../models";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { foodCategoryId } = req.params;
    const { categoryName } = req.body;

    if (!categoryName || typeof categoryName !== "string") {
      res.status(400).send({ message: "categoryName is required" });
      return;
    }

    const updated = await CategoryModel.findByIdAndUpdate(
      foodCategoryId,
      { categoryName },
      { new: true },
    );

    if (!updated) {
      res.status(400).send({ message: "category not found" });
      return;
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "error updateing category", error });
  }
};
