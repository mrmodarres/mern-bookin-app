import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config"; // to access envierment
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import userAuth from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels";
import hotelsRoutes from "./routes/hotels";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.COUDINARY_API_SECRET,
});

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
app.use("/api/my-hotels", myHotelsRoutes);
app.use("/api/hotels", hotelsRoutes);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(4000, () => {
  console.log("Server running at Port 4000");
});
