import {
  UserSignUp,
  UserSignIn,
  refreshToken,
  resetPassword,
  UserPasswordReset,
  verifyResetPasswordRequest,
} from "../controllers/user";
import { getUserData } from "../controllers/user/get-user-data.controller";
import { verifyUser } from "../controllers/user/verify-user.controller";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/create-user", UserSignUp);
userRouter.get("/verify-user", verifyUser);
userRouter.post("/login-user", UserSignIn);
userRouter.get("/get-user", getUserData);
userRouter.get("/user-refresh", refreshToken);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/forgot-password", UserPasswordReset);
userRouter.get("/verify-reset-token", verifyResetPasswordRequest);

// "name": "asd",
// "userName": "asdf",
// "phoneNumber": "99111199",
// "address": "dubai",
// "password": "123456"
