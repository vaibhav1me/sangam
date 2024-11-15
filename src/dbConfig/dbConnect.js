import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("connecting ...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error)
    console.log("Error while connecting to Database");
  }
};
