import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected..!!");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

export default connectToDB;
