import { Request, Response } from "express";
import { authServices } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signUp(req.body);
    if (result.rows.length > 0) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: error.message, data: null });
  }
};
const signIn = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signIn(req.body);
    if (result === null) {
      return res.status(200).json({
        success: false,
        message: "User not found with this email",
        data: null,
      });
    }
    if (result === false) {
      return res.status(200).json({
        success: false,
        message: "Password not matched",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: false, message: error.message, data: null });
  }
};

export const authControllers = { signUp, signIn };
