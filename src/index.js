import { app } from "./app.js";
import DB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

DB()
  .then(
    app.listen(process.env.PORT || 8000, () => {
      console.log("App listening on port", process.env.PORT);
    })
  )
  .catch((error) => console.error("MONGODB connection failed !!! ", error));
/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRr: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
})();

*/
