import { Request, Response } from "express";
import { OrderModel } from "../models";
import mongoose from "mongoose";

export const getOrderedFood = async (
  req: Request<{ userId: string }>,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).send({ message: "userId is required" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).send({ message: "Invalid userId" });
      return;
    }
    const orders = await OrderModel.find({
      user: new mongoose.Types.ObjectId(userId),
      isCart: false,
    }).sort({ createdAt: -1 });

    return res.status(200).send({
      message: "Ordered food retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error fetching orders" });
  }
};
