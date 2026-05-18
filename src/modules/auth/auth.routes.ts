import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

//signup
router.post("/signup", authControllers.signUp);

export const authRoutes = router;
