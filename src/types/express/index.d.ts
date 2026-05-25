import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../role";

declare global {
  namespace Express {
    interface Request {
      user?:
        | JwtPayload
        | {
            id: number;
            name: string;
            email: string;
            phone: string;
            role: UserRole.ADMIN | UserRole.CUSTOMER;
          };
    }
  }
}
