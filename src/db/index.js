import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DB = async () => {
  try {
    const DBInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `DB connection established on Host:  ${DBInstance.connection.host}`
    );
  } catch (error) {
    console.error("DB Connection Failed: ", error);
    process.exit(1);
  }
};

export default DB;
