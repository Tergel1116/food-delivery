import { Router } from "express";
import {
  createFood,
  deleteFood,
  getFoodById,
  updateFood,
  getFood,
} from "../controllers";
import { authentication, authorization } from "../middleware";

export const foodRouter = Router();
foodRouter.get("/get-foods", getFood);
foodRouter.get("/get-food", getFoodById);
foodRouter.delete(
  "delete-food",
  authentication,
  authorization(["ADMIN"]),
  deleteFood,
);
foodRouter.put(
  "update-food",
  authentication,
  authorization(["ADMIN"]),
  updateFood,
);
foodRouter.post(
  "/create-food",
  authentication,
  authorization(["ADMIN"]),
  createFood,
);
