import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicle(req.body);
    if (result.rows[0]) {
      return res.status(201).json({
        success: true,
        message: "Vehicle successfully added",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getAllVehicles();
    return res
      .status(200)
      .json({ success: true, message: "Vehicles fetched", data: result.rows });
  } catch (error: any) {
    return res.status(500).json({ success: true, message: error.message });
  }
};
export const vehiclesControllers = { createVehicle, getAllVehicles };
