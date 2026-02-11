import mongoose from "mongoose";

export const DB_connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/SarahaApp")
    console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection failed", error);
    }
}   