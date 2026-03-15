import { Router } from "express";
import { authentication, authorization } from "../middleware";
import {
  createFoodCategory,
  getFoodCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/food-category";

export const categoryRouter = Router();

categoryRouter.get("/get-categories", getFoodCategory);

categoryRouter.post(
  "/create-category",
  authentication,
  authorization(["ADMIN"]),
  createFoodCategory,
);

categoryRouter.delete(
  "/delete-category",
  authentication,
  authorization(["ADMIN"]),
  deleteCategory,
);

categoryRouter.put(
  "/update-category",
  authentication,
  authorization(["ADMIN"]),
  updateCategory,
);
