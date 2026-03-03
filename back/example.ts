// /*
//   This file is a copy/paste playbook for your unfinished backend parts.
//   I did not edit any other file.

//   --------------------------------------------------------------------
//   SECTION 1: AUTH MIDDLEWARES
//   --------------------------------------------------------------------
// */

// /*
// File: src/middleware/authentication.ts
// */
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";

// type JwtPayload = {
//   _id: string;
//   email: string;
//   role?: "USER" | "ADMIN";
// };

// export const authentication = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const header = req.headers.authorization;

//     if (!header || !header.startsWith("Bearer ")) {
//       return res.status(401).send({ message: "Unauthorized" });
//     }

//     const token = header.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

//     (req as Request & { user?: JwtPayload }).user = decoded;
//     return next();
//   } catch (error) {
//     return res.status(401).send({ message: "Invalid or expired token" });
//   }
// };


// /*
// File: src/middleware/authorization.ts
// */
// import { NextFunction, Request, Response } from "express";

// type UserRole = "USER" | "ADMIN";

// export const authorization =
//   (allowedRoles: UserRole[] = ["ADMIN"]) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const user = (req as Request & { user?: { role?: UserRole } }).user;

//     if (!user) {
//       return res.status(401).send({ message: "Unauthorized" });
//     }

//     if (!user.role || !allowedRoles.includes(user.role)) {
//       return res.status(403).send({ message: "Forbidden" });
//     }

//     return next();
//   };


// /*
//   --------------------------------------------------------------------
//   SECTION 2: ROUTERS (missing coverage)
//   --------------------------------------------------------------------
// */

// /*
// File: src/routers/food.router.ts
// */
// import { Router } from "express";
// import {
//   createFood,
//   deleteFood,
//   getFood,
//   getFoodById,
//   updateFood,
// } from "../controllers/foods";
// import { authentication, authorization } from "../middleware";

// export const foodRouter = Router();

// foodRouter.get("/", getFood);
// foodRouter.get("/:foodId", getFoodById);
// foodRouter.post("/", authentication, authorization(["ADMIN"]), createFood);
// foodRouter.put("/:foodId", authentication, authorization(["ADMIN"]), updateFood);
// foodRouter.delete("/:foodId", authentication, authorization(["ADMIN"]), deleteFood);


// /*
// File: src/routers/category.router.ts (new)
// */
// import { Router } from "express";
// import {
//   createFoodCategory,
//   deleteCategory,
//   getFoodCategory,
//   updateCategory,
// } from "../controllers/food-category";
// import { authentication, authorization } from "../middleware";

// export const categoryRouter = Router();

// categoryRouter.get("/", getFoodCategory);
// categoryRouter.post("/", authentication, authorization(["ADMIN"]), createFoodCategory);
// categoryRouter.put("/:foodCategoryId", authentication, authorization(["ADMIN"]), updateCategory);
// categoryRouter.delete("/:foodCategoryId", authentication, authorization(["ADMIN"]), deleteCategory);


// /*
// File: src/routers/order.router.ts (new)
// */
// import { Router } from "express";
// import {
//   createFoodOrder,
//   getAllOrders,
//   getOrderedFood,
//   updatedOrder,
// } from "../controllers/order";
// import { authentication, authorization } from "../middleware";

// export const orderRouter = Router();

// orderRouter.post("/", authentication, createFoodOrder);
// orderRouter.get("/my/:userId", authentication, getOrderedFood);
// orderRouter.get("/", authentication, authorization(["ADMIN"]), getAllOrders);
// orderRouter.patch("/:orderId", authentication, authorization(["ADMIN"]), updatedOrder);


// /*
// File: src/routers/cart.router.ts (new)
// */
// import { Router } from "express";
// import {
//   deleteCartInformation,
//   getCartInformation,
//   postIntoCart,
//   updateCartInformation,
// } from "../controllers/cart";
// import { authentication } from "../middleware";

// export const cartRouter = Router();

// cartRouter.get("/:userId", authentication, getCartInformation);
// cartRouter.post("/", authentication, postIntoCart);
// cartRouter.put("/:userId", authentication, updateCartInformation);
// cartRouter.delete("/:userId", authentication, deleteCartInformation);


// /*
// File: src/routers/index.ts

// export * from "./user.router";
// export * from "./food.router";
// export * from "./category.router";
// export * from "./order.router";
// export * from "./cart.router";
// */

// /*
// File: src/index.ts (mount all routers)
// */
// import cors from "cors";
// import { configDotenv } from "dotenv";
// import express, { Application } from "express";
// import {
//   cartRouter,
//   categoryRouter,
//   foodRouter,
//   orderRouter,
//   userRouter,
// } from "./routers";
// import connectToMongoDB from "./mongodb";

// configDotenv();

// const app: Application = express();
// app.use(cors());
// app.use(express.json());

// app.use("/foods", foodRouter);
// app.use("/categories", categoryRouter);
// app.use("/orders", orderRouter);
// app.use("/cart", cartRouter);
// app.use("/users", userRouter);

// const port = Number(process.env.PORT) || 8000;

// connectToMongoDB();
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// /*
//   --------------------------------------------------------------------
//   SECTION 3: CART CONTROLLERS (your files are empty)
//   --------------------------------------------------------------------
// */

// /*
// File: src/controllers/cart/post-into-cart.controller.ts
// */
// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { FoodModel, OrderModel } from "../models";

// const buildTotal = (
//   items: { food: string; quantity: number }[],
//   priceMap: Map<string, number>,
// ) => {
//   return items.reduce((sum, item) => {
//     const price = priceMap.get(String(item.food)) || 0;
//     return sum + price * Number(item.quantity);
//   }, 0);
// };

// export const postIntoCart = async (req: Request, res: Response) => {
//   try {
//     const { userId, foodOrderItems } = req.body;

//     if (
//       !userId ||
//       !mongoose.Types.ObjectId.isValid(userId) ||
//       !Array.isArray(foodOrderItems) ||
//       foodOrderItems.length === 0
//     ) {
//       return res.status(400).send({ message: "Invalid userId or foodOrderItems" });
//     }

//     const foodIds = foodOrderItems.map((item: { food: string }) => item.food);
//     const foods = await FoodModel.find({ _id: { $in: foodIds } });

//     if (foods.length !== foodIds.length) {
//       return res.status(400).send({ message: "Some food items were not found" });
//     }

//     const priceMap = new Map<string, number>();
//     foods.forEach((food: { _id: mongoose.Types.ObjectId; price: number }) => {
//       priceMap.set(String(food._id), Number(food.price));
//     });

//     const totalPrice = buildTotal(foodOrderItems, priceMap);

//     const cart = await OrderModel.findOneAndUpdate(
//       { user: userId, isCart: true },
//       {
//         $set: {
//           user: userId,
//           foodOrderItems,
//           totalPrice,
//           status: "PENDING",
//           isCart: true,
//         },
//       },
//       { new: true, upsert: true },
//     );

//     return res.status(200).send({ message: "Cart saved", data: cart });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error" });
//   }
// };


// /*
// File: src/controllers/cart/get-cart-information.controller.ts
// */
// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { OrderModel } from "../models";

// export const getCartInformation = async (
//   req: Request<{ userId: string }>,
//   res: Response,
// ) => {
//   try {
//     const { userId } = req.params;

//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).send({ message: "Invalid userId" });
//     }

//     const cart = await OrderModel.findOne({ user: userId, isCart: true }).populate(
//       "foodOrderItems.food",
//     );

//     if (!cart) {
//       return res.status(404).send({ message: "Cart not found" });
//     }

//     return res.status(200).send({ message: "Cart fetched", data: cart });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error" });
//   }
// };


// /*
// File: src/controllers/cart/update-cart-information.controller.ts
// */
// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { FoodModel, OrderModel } from "../models";

// export const updateCartInformation = async (
//   req: Request<{ userId: string }>,
//   res: Response,
// ) => {
//   try {
//     const { userId } = req.params;
//     const { foodOrderItems } = req.body;

//     if (
//       !userId ||
//       !mongoose.Types.ObjectId.isValid(userId) ||
//       !Array.isArray(foodOrderItems)
//     ) {
//       return res.status(400).send({ message: "Invalid payload" });
//     }

//     const foodIds = foodOrderItems.map((item: { food: string }) => item.food);
//     const foods = await FoodModel.find({ _id: { $in: foodIds } });

//     const priceMap = new Map<string, number>();
//     foods.forEach((food: { _id: mongoose.Types.ObjectId; price: number }) => {
//       priceMap.set(String(food._id), Number(food.price));
//     });

//     const totalPrice = foodOrderItems.reduce(
//       (sum: number, item: { food: string; quantity: number }) => {
//         const price = priceMap.get(String(item.food)) || 0;
//         return sum + price * Number(item.quantity || 0);
//       },
//       0,
//     );

//     const cart = await OrderModel.findOneAndUpdate(
//       { user: userId, isCart: true },
//       { $set: { foodOrderItems, totalPrice } },
//       { new: true },
//     );

//     if (!cart) {
//       return res.status(404).send({ message: "Cart not found" });
//     }

//     return res.status(200).send({ message: "Cart updated", data: cart });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error" });
//   }
// };


// /*
// File: src/controllers/cart/delete-cart-information.controller.ts
// */
// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import { OrderModel } from "../models";

// export const deleteCartInformation = async (
//   req: Request<{ userId: string }>,
//   res: Response,
// ) => {
//   try {
//     const { userId } = req.params;

//     if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).send({ message: "Invalid userId" });
//     }

//     const deleted = await OrderModel.findOneAndDelete({ user: userId, isCart: true });

//     if (!deleted) {
//       return res.status(404).send({ message: "Cart not found" });
//     }

//     return res.status(200).send({ message: "Cart deleted" });
//   } catch (error) {
//     return res.status(500).send({ message: "Internal server error" });
//   }
// };


// /*
// File: src/controllers/cart/index.ts
// */
// export * from "./delete-cart-information.controller";
// export * from "./get-cart-information.controller";
// export * from "./post-into-cart.controller";
// export * from "./update-cart-information.controller";


// /*
//   --------------------------------------------------------------------
//   SECTION 4: QUICK BUG FIX SNIPPETS
//   --------------------------------------------------------------------
// */

// /*
// File: src/controllers/user/user-sign-in.controller.ts
// */
// import { Request, Response } from "express";
// import { UserModel } from "../models";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export const UserSignIn = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return res.status(400).send({ message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).send({ message: "Invalid Password" });
//     }

//     const token = jwt.sign(
//       { email: user.email, _id: user._id, role: user.role },
//       process.env.JWT_SECRET!,
//       { expiresIn: "7d" },
//     );

//     return res.status(200).json({
//       message: "Sign-in successful",
//       success: true,
//       data: user,
//       token,
//     });
//   } catch (error) {
//     return res.status(500).send({ message: "Error signing in" });
//   }
// };


// /*
// File: src/controllers/foods/get-food-by-id.controller.ts
// */
// import { Request, Response } from "express";
// import { FoodModel } from "../models";

// export const getFoodById = async (req: Request, res: Response) => {
//   try {
//     const { foodId } = req.params;
//     const food = await FoodModel.findById(foodId).populate("category");

//     if (!food) {
//       return res.status(404).send({ message: "Food not found" });
//     }

//     return res.status(200).send({ message: "successful", data: food });
//   } catch (error) {
//     return res.status(400).send({ message: "Error fetching food by id" });
//   }
// };


// /*
// File: src/controllers/foods/update-food.controller.ts
// */
// import { Request, Response } from "express";
// import { FoodModel } from "../models";

// export const updateFood = async (req: Request, res: Response) => {
//   try {
//     const { foodId } = req.params;

//     const updated = await FoodModel.findByIdAndUpdate(foodId, req.body, {
//       new: true,
//     });

//     if (!updated) {
//       return res.status(404).send({ message: "Food not found" });
//     }

//     return res.status(200).send({ message: "Food updated", data: updated });
//   } catch (error) {
//     return res.status(400).send({ message: "Error updating food" });
//   }
// };


// /*
// File: src/controllers/food-category/create-food-category.controller.ts
// */
// import { Request, Response } from "express";
// import { CategoryModel } from "../models";

// export const createFoodCategory = async (req: Request, res: Response) => {
//   try {
//     const { categoryName } = req.body;

//     if (!categoryName || typeof categoryName !== "string") {
//       return res.status(400).send({ message: "categoryName is required" });
//     }

//     const exists = await CategoryModel.findOne({
//       categoryName: categoryName.trim(),
//     });

//     if (exists) {
//       return res.status(400).send({ message: "category already exists" });
//     }

//     const category = await CategoryModel.create({
//       categoryName: categoryName.trim(),
//     });

//     return res.status(201).send({ message: "category created", data: category });
//   } catch (error) {
//     return res.status(500).send({ message: "error creating category" });
//   }
// };


// /*
// File: src/controllers/food-category/update-category.controller.ts
// */
// import { Request, Response } from "express";
// import { CategoryModel } from "../models";

// export const updateCategory = async (req: Request, res: Response) => {
//   try {
//     const { foodCategoryId } = req.params;
//     const { categoryName } = req.body;

//     if (!categoryName || typeof categoryName !== "string") {
//       return res.status(400).send({ message: "categoryName is required" });
//     }

//     const updated = await CategoryModel.findByIdAndUpdate(
//       foodCategoryId,
//       { categoryName: categoryName.trim() },
//       { new: true },
//     );

//     if (!updated) {
//       return res.status(404).send({ message: "category not found" });
//     }

//     return res.status(200).send({ message: "category updated", data: updated });
//   } catch (error) {
//     return res.status(500).send({ message: "error updating category" });
//   }
// };


// /*
// File: src/controllers/user/user-verify-reset-password-request.controller.ts
// (redirect should go to frontend reset screen, not backend verify endpoint)
// */
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { UserModel } from "../models";

// export const verifyResetPasswordRequest = async (
//   req: Request,
//   res: Response,
// ) => {
//   const token = req.query.token as string;

//   if (!token) {
//     return res.status(400).json({ message: "Token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       userId: string;
//       type: string;
//     };

//     if (decoded.type !== "verify-reset-password") {
//       return res.status(400).json({ message: "Invalid token type" });
//     }

//     const user = await UserModel.findById(decoded.userId);
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const resetToken = jwt.sign(
//       {
//         userId: user._id,
//         type: "password-reset",
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "5m" },
//     );

//     return res.redirect(
//       `${process.env.FRONTEND_URL}/update-password?token=${resetToken}`,
//     );
//   } catch (error) {
//     return res.status(400).json({
//       message: "Invalid or expired token",
//     });
//   }
// };


// /*
//   --------------------------------------------------------------------
//   SECTION 5: MODEL FIX (critical)
//   --------------------------------------------------------------------
// */

// /*
// File: src/controllers/models/user.model.ts
// */
// import { Model, model, models, Schema } from "mongoose";

// enum UserRole {
//   USER = "USER",
//   ADMIN = "ADMIN",
// }

// type User = {
//   email: string;
//   password: string;
//   phoneNumber: string;
//   role: UserRole;
//   isVerified: boolean;
//   name: string;
//   userName: string;
//   ttl: Date;
//   address: string;
// };

// export const UserSchema = new Schema<User>({
//   email: { type: String, required: true, unique: true, trim: true, lowercase: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   role: {
//     type: String,
//     enum: Object.values(UserRole),
//     default: UserRole.USER,
//   },
//   isVerified: { type: Boolean, default: false, required: true },
//   name: { type: String, required: true },
//   userName: { type: String, required: true, unique: true },
//   ttl: { type: Date },
//   address: { type: String, required: true },
// });

// UserSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

// export const UserModel: Model<User> =
//   models["User"] || model("User", UserSchema);


// /*
//   --------------------------------------------------------------------
//   SECTION 6: SMALL EXPORT FIXES
//   --------------------------------------------------------------------
// */

// /*
// File: src/controllers/foods/index.ts
// */
// export * from "./create-new-food.controller";
// export * from "./delete-food.controller";
// export * from "./get-food-by-id.controller";
// export * from "./get-food.controller";
// export * from "./update-food.controller";


// /*
// File: src/controllers/food-category/index.ts (new)
// */
// export * from "./create-food-category.controller";
// export * from "./delete-food-category.controller";
// export * from "./get-food-category.controller";
// export * from "./update-category.controller";


// /*
// File: src/controllers/order/index.ts (new)
// */
// export * from "./create-food-order.controller";
// export * from "./get-all-order.controller";
// export * from "./get-ordered-food.controller";
// export * from "./update-order.controller";


// /*
// Done:
// - Separated by category.
// - Added ready snippets for your unfinished parts.
// - Did not modify any file except example.ts.


// export {};
