// import { Request, Response } from "express";
// import { OrderModel } from "../models";
// import { FoodModel } from "../models";
// import mongoose from "mongoose";

// export const createFoodOrder = async (req: Request, res: Response) => {
//   try {
//     const { userId, foodOrderItems } = req.body;

//     if (
//       !userId ||
//       !Array.isArray(foodOrderItems) ||
//       foodOrderItems.length === 0
//     ) {
//       res.status(400).send({
//         message:
//           "userId and foodOrderItems are required, and foodOrderItems must be a non-empty array",
//       });
//       return;
//     }
//     const foodIds = foodOrderItems.map((i: any) => i.food);
//     const foods = await FoodModel.find({ _id: { $in: foodIds } });

//     const priceMap = new Map<string, number>();
//     foods.forEach((f: any) => priceMap.set(String(f._id), Number(f.price)));
//     let totalPrice = 0;
//     for (const item of foodOrderItems) {
//       const price = priceMap.get(String(item.food)) || 0;
//       totalPrice += price * Number(item.quantity || 0);
//     }
//     const order = await OrderModel.create({
//       user: new mongoose.Types.ObjectId(userId),
//       foodOrderItems,
//       totalPrice,
//       status: "PENDING",
//       isCart: true,
//     });

//     return res
//       .status(201)
//       .send({ message: "Order created successfully", data: order });
//   } catch (error) {
//     console.error("Error creating food order:", error);
//     res.status(400).send({ message: "Error creating food order", error });
//   }
// };

import { Request, Response } from "express";
import { OrderModel } from "../models";
import { FoodModel } from "../models";
import mongoose from "mongoose";

export const createFoodOrder = async (req: Request, res: Response) => {
  try {
    const { userId, foodOrderItems } = req.body;

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !Array.isArray(foodOrderItems) ||
      foodOrderItems.length === 0
    ) {
      return res.status(400).send({
        message: "Invalid userId or foodOrderItems",
      });
    }

    for (const item of foodOrderItems) {
      if (
        !mongoose.Types.ObjectId.isValid(item.food) ||
        !item.quantity ||
        item.quantity <= 0
      ) {
        return res.status(400).send({
          message: "Invalid food id or quantity",
        });
      }
    }

    const foodIds = foodOrderItems.map((i: any) => i.food);
    const foods = await FoodModel.find({ _id: { $in: foodIds } });

    if (foods.length !== foodIds.length) {
      return res.status(400).send({
        message: "Some food items not found",
      });
    }

    const priceMap = new Map<string, number>();
    foods.forEach((f: any) => priceMap.set(String(f._id), Number(f.price)));

    let totalPrice = 0;
    for (const item of foodOrderItems) {
      const price = priceMap.get(String(item.food))!;
      totalPrice += price * Number(item.quantity);
    }

    const order = await OrderModel.create({
      user: userId,
      foodOrderItems,
      totalPrice,
      status: "PENDING",
      isCart: true,
    });

    return res.status(201).send({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error creating food order:", error);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};
