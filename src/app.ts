import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { usersRoutes } from "./modules/users/users.route";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";
const version = "/api/v1";
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
initDB();

// routes
app.use(`${version}/auth`, authRoutes);
app.use(`${version}/vehicles`, vehiclesRoutes);
app.use(`${version}/users`, usersRoutes);
app.use(`${version}/bookings`, bookingsRoutes);

// default get
app.get("", (req: Request, res: Response) => {
  res.send("Vehicle rental system server is running...");
});
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Target route not found.",
    data: { path: req.path, method: req.method },
  });
});
export default app;
