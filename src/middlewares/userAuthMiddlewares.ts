import { NextFunction, Request, Response } from "express";
import { Login, SignUp } from "../utils/types";

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body as Login;
    const { username, password } = data;
    if (!username || !password) {
      return res.json({
        status: false,
        message: "Username/password cannot be empty",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
    });
  }
};

export const signUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body as SignUp;
    const { username, password, email } = data;
    if (!username || !password || !email) {
      return res.json({
        status: false,
        message: "Username/password/email cannot be empty",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
    });
  }
};
