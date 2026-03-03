import { model, models, ObjectId, Schema, Model } from "mongoose";

type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const foodSchema = new Schema<Food>(
  {
    foodName: { type: String, required: true },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  },
);

export const FoodModel: Model<Food> =
  models["Food"] || model<Food>("Food", foodSchema);
