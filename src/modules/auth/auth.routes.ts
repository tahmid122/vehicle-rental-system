import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

//signup
router.post("/signup", authControllers.signUp);
//signin
router.post("/signin", authControllers.signIn);

export const authRoutes = router;
