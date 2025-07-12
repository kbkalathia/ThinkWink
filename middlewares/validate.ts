import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { decodeToken, SendResponse } from "../utils/helpers";
import { HttpStatusCode } from "axios";
import { JWTPayload } from "../interfaces/jwt.interface";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return SendResponse({
      res,
      status: HttpStatusCode.BadRequest,
      message: "Validation failed",
      data: errors.array(),
    });
  }
  next();
};

export const authenticateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return SendResponse({
        res,
        status: HttpStatusCode.Unauthorized,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = decodeToken(token);

    req.user = decoded as JWTPayload;

    next();
  } catch (error) {
    return SendResponse({
      res,
      status: HttpStatusCode.Unauthorized,
      message: "Invalid or expired token",
    });
  }
};
