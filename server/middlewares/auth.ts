import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Token is missing"
      });
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      req.user = decoded;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unauthorized";
      return res.status(401).json({
        success: false,
        message
      });
    }

    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return res.status(401).json({
      success: false,
      message
    });
  }
};

export { auth };