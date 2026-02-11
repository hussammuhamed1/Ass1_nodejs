import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    age: Number,

    password: String,
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamp: true,
  },
);

export const userModel = model("User", userSchema);
