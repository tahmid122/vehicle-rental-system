import { Router } from "express";
import { usersControllers } from "./users.controller";
import { verifyUser } from "../../middlewares/verifyUser";
import { UserRole } from "../../types/role";

const router = Router();

//get all users
router.get("/", verifyUser(UserRole.ADMIN), usersControllers.getAllUsers);
//update user
router.put(
  "/:userId",
  verifyUser(UserRole.ADMIN, UserRole.CUSTOMER),
  usersControllers.updateUser,
);
export const usersRoutes = router;
