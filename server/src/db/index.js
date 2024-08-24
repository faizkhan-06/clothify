import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MONGODB connected !! DBHOST : ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error("MONGODB connection FAILED ", err);
    process.exit(1);
  }
};

export default connectDB;
