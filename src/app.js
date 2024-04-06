import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// !DIFFERENT CONFIGURATION SETTINGS NEEDED FOR BACKEND DATABASE MAINTENANCE

// middleware to allow different sources to interact with our application
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// allows different json data to interact with our application under a limit of 16kb
app.use(express.json({ limit: "16kb" }));

// allows to data in url to be encoded. Eg. kunal+garg or kunal%garg%05.
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// allows to save static data in public folder like images or favicons
app.use(express.static("public"));

// allows to perfrom CRUD operations on cookie. send/get cookie to/from browser
app.use(cookieParser());

// TODO: routes import
import userRouter from "./routes/user.routes.js";

// * Routes Declarations
app.use("/api/v1/users", userRouter);

export { app };
