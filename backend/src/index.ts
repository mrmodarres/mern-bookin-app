import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config"; // to access envierment
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import userAuth from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// its cors policy to access to the backend and credentials for passing cookie
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", userAuth);
app.use("/api/users", userRoutes);

app.listen(4000, () => {
  console.log("Server running at Port 4000");
});
