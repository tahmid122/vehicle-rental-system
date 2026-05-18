import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
const version = "/api/v1";
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
initDB();

// routes
app.use(`${version}/auth`, authRoutes);

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
