import mongoose from "mongoose";

// this function is use to connect our server file to mongodb database
export const connectDB = async() =>{
  await mongoose.connect("mongodb+srv://root:root@bapasitaram.d4mxzp0.mongodb.net/cafe").then(()=>console.log("db connected"));
}