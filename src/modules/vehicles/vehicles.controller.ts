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
const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehiclesServices.getVehicleById(vehicleId as string);
    if (result.rows[0]) {
      return res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
    return res
      .status(200)
      .json({ success: false, message: `NO vehicle found with ${vehicleId}` });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehiclesServices.updateVehicle(
      req.body,
      vehicleId as string,
    );
    if (result.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
    return res
      .status(200)
      .json({ success: false, message: "Failed to update" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.deleteVehicle(
      req.params.vehicleId as string,
    );
    if (result.rows.length === 0) {
      throw new Error("Vehicle not found");
    }

    return res
      .status(201)
      .json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const vehiclesControllers = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
