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
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;
    const id = req.user?.id;
    const result = await bookingsServices.getAllBookings(role, id);
    if (result.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: result.rows,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "0 bookings found",
        data: result.rows,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const role = req.user?.role;
    const result = await bookingsServices.updateBooking(
      bookingId as string,
      role,
    );
    if (result.rows.length > 0) {
      return res.status(201).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result.rows[0],
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Failed to update",
        data: null,
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const bookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
