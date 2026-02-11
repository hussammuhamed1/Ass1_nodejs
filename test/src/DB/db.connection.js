import mongoose from "mongoose";

export const connectionDB = async ()=>{
    await mongoose.connect("mongodb://localhost:27017/Mongoose")
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>{
        console.log("Database connection failed", err);
    });

}