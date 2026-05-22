import { Request, Response } from "express";
import { usersServices } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({ success: true, message: error.message });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (req.user && Number(userId) !== req.user.id) {
      throw new Error("User can not updated other user profile");
    }
    const result = await usersServices.updateUser(req.body, userId as string);
    if (result.rows[0]) {
      return res.status(201).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
    console.log(result);
  } catch (error: any) {
    return res.status(500).json({ success: true, message: error.message });
  }
};

export const usersControllers = { getAllUsers, updateUser };
