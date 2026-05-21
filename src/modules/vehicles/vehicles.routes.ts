import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";
import { verifyUser } from "../../middlewares/verifyUser";
import { UserRole } from "../../types/role";

const router = Router();

//create vehicle
router.post("/", verifyUser("admin"), vehiclesControllers.createVehicle);
//get all vehicles
router.get("/", vehiclesControllers.getAllVehicles);

export const vehiclesRoutes = router;
