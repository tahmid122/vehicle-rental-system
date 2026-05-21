import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/role";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
export const verifyUser = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "You are not allowed" });
      }
      const decoded: JwtPayload = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }
      next();
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
};
