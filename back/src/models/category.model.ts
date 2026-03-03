import { model, models, Schema, Model } from "mongoose";

type Category = {
  categoryName: string;
};

export const categorySchema = new Schema<Category>(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel: Model<Category> =
  models["Category"] || model<Category>("Category", categorySchema);
