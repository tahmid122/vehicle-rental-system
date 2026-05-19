import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicle(req.body);
    return res.status(201).json({ success: true, message: "Hit" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const vehiclesControllers = { createVehicle };
