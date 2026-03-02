import { Router } from "express";
import { createFood } from "../controllers";
import { authentication, authorization } from "../middleware";

export const foodRouter = Router();

foodRouter.get("/create-food", authentication, authorization, createFood);
