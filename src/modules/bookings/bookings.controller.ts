import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBooking(req.body);
    console.log(result);
    if (result.rows[0]) {
      return res.status(201).send({
        success: true,
        message: "Booking created successfully",
        data: result.rows[0],
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Failed to create",
        data: null,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const bookingControllers = { createBooking };
