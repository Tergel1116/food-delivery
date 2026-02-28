import { Request, Response } from "express";
import { FoodModel } from "../models";
import { OrderModel } from "../models";
import mongoose from "mongoose";

const allowed = ["PENDING", "CANCELED", "DELIVERED"];
export const updatedOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!allowed.includes(status)) {
      res.status(400).send({ message: "Invalid status" });
      return;
    }

    const updated = await OrderModel.findByIdAndUpdate(
      orderId,
      { status, isCart: false },
      { new: true },
    );

    if (!updated) {
      res.status(404).send({ message: "Order not found" });
      return;
    }

    return res.status(200).send({
      message: "Order updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
