import { UserSignUp, UserSignIn } from "../controllers/user";
import { getUserData } from "../controllers/user/get-user-data.controller";
import { verifyUser } from "../controllers/user/verify-user.controller";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/create-user", UserSignUp);
userRouter.get("/verify-user", verifyUser);
userRouter.post("/login-user", UserSignIn);
userRouter.get("/get-user", getUserData);
