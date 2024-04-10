import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// we add userId to Request type in Express its global change type of Request from Express
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth-token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    if (!secretKey) {
      throw new Error("JWT secret key is not in the envierment");
    }
    const decode = jwt.verify(token, secretKey) as JwtPayload;

    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default verifyToken;
