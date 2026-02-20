import { model, models, ObjectId, Schema, Model } from "mongoose";

export enum FoodOrderEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type FoodOrderItem = {
  food: ObjectId;
  quantity: number;
};

type Order = {
  user: ObjectId;
  totalPrice: number;
  foodOrderItems: FoodOrderItem[];
  status: FoodOrderEnum;
  isCart: boolean;
};

const FoodOrderItemSchema = new Schema<FoodOrderItem>(
  {
    food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

export const orderSchema = new Schema<Order>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    foodOrderItems: { type: [FoodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderEnum),
      default: FoodOrderEnum.PENDING,
      required: true,
    },

    isCart: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const OrderModel: Model<Order> =
  models["Order"] || model<Order>("Order", orderSchema);
