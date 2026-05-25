import { Router } from "express";
import { bookingControllers } from "./bookings.controller";

const router = Router();

//create booking
router.post("/", bookingControllers.createBooking);

export const bookingsRoutes = router;
