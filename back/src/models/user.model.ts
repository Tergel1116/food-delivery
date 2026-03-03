import { Model, model, models, Schema } from "mongoose";

enum Userrole {
  USER = "USER",
  ADMIN = "ADMIN",
}

type User = {
  email: string;
  password: string;
  phoneNumber: string;
  role: Userrole;
  isVerified: boolean;
  name: string;
  userName: string;
  ttl: Date;
  address: string;
};

export const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  role: {
    type: String,
    renum: Object.values(Userrole),
    default: Userrole.USER,
    required: false,
  },

  isVerified: { type: Boolean, default: false, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  ttl: { type: Date, required: false },
  address: { type: String, required: true },
});

UserSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 });

export const UserModel: Model<User> =
  models["User"] || model("User", UserSchema);
