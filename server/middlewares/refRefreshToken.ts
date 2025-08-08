import type { NextFunction, Request, Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { JwtPayload } from "../declarations.ts";
import { User } from "../models/user.js";

const refreshRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Missing",
      });
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Expired",
      });
    }

    const newRefreshToken = jwt.sign(
      { id: user._id.toString() } as JwtPayload,
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME ?? "7d",
      } as SignOptions
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return res.status(401).json({
      success: false,
      message: message,
    });
  }
};

export { refreshRefreshToken };
