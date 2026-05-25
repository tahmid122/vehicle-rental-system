import { Router } from "express";
import { bookingControllers } from "./bookings.controller";
import { verifyUser } from "../../middlewares/verifyUser";
import { UserRole } from "../../types/role";

const router = Router();

//create booking
router.post("/", bookingControllers.createBooking);
//get all
router.get(
  "/",
  verifyUser(UserRole.ADMIN, UserRole.CUSTOMER),
  bookingControllers.getAllBookings,
);

export const bookingsRoutes = router;
