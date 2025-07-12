import * as express from "express";
import { JWTPayload } from "../../interfaces/jwt.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
