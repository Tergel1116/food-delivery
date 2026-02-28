import { Request, Response } from "express";
import { OrderModel } from "../models";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res
      .status(200)
      .send({ message: "Order retrieved successfully", data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
