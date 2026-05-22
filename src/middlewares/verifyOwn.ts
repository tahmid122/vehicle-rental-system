import { NextFunction, Request, Response } from "express";

const verifyOwn = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (req.user && Number(userId) !== req.user.id) {
    return res
      .status(403)
      .json({ success: false, message: "It's not your profile" });
  }
  return next();
};
export default verifyOwn;
