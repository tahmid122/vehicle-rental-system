import express, { Request, Response } from "express";
const app = express();

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
