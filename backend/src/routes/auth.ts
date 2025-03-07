import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isString(),
    check("password", "Password with 6 more or required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.status(400).json({
          message: "Invalid  Cardential",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Cardential",
        });
      }
      const token = await jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // its gona be like expires
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      return res.status(500).json({
        message: "somthing went wrong",
      });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth-token", "", {
    expires: new Date(0),
  });
  res.send();
});
export default router;
