import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";
import { verifyUser } from "../../middlewares/verifyUser";
import { UserRole } from "../../types/role";

const router = Router();

//create vehicle
router.post("/", verifyUser(UserRole.ADMIN), vehiclesControllers.createVehicle);
//get all vehicles
router.get("/", vehiclesControllers.getAllVehicles);
//get vehicle by id
router.get("/:vehicleId", vehiclesControllers.getVehicleById);
//update vehicle admin only
router.put(
  "/:vehicleId",
  verifyUser(UserRole.ADMIN),
  vehiclesControllers.updateVehicle,
);

export const vehiclesRoutes = router;
