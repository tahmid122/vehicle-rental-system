import { Request, Response } from "express";
import { usersServices } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsers();
    return res
      .status(200)
      .json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
  } catch (error: any) {
    return res.status(500).json({ success: true, message: error.message });
  }
};

export const usersControllers = { getAllUsers };
