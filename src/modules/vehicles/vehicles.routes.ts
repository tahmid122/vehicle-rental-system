import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";

const router = Router();

//create vehicle
router.post("/", vehiclesControllers.createVehicle);

export const vehiclesRoutes = router;
