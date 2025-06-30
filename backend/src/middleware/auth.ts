// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express's Request type to include our user payload
export interface AuthenticatedRequest extends Request {
  user?: { userId: number; companyId: number };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "No token provided, authorization denied." });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      companyId: number;
    };
    req.user = decoded; // Attach user payload to the request
    next();
  } catch (error) {
    res.status(403).json({ message: "Token is not valid." });
    return;
  }
};
