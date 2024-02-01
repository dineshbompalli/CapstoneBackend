import { NextFunction } from "connect";
import { Request, Response } from "express";
import { Login, SignUp } from "../utils/types";
import { compare } from "bcrypt";
import { hash } from "../utils/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as Login;
  const { username, password } = data;

  try {
    const userDetails = await prisma.users.findFirst({
      where: {
        username,
      },
    });
    if (!userDetails?.id) {
      return res.json({
        status: false,
        message: "Username not exists",
      });
    }

    const match = await compare(password, userDetails.password || "");
    if (!match) {
      return res.json({
        status: false,
        message: "Password Invalid",
      });
    }

    return res.json({
      user: userDetails,
      status: true,
    });
  } catch (error) {
    return res.json({
      status: false,
    });
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as SignUp;
  const { username, password, email } = data || {};

  try {
    const userDetails = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username,
            email,
          },
        ],
      },
    });

    if (userDetails?.id) {
      return res.json({
        status: false,
        message: "Username or Email already exists",
      });
    }
    const response = await prisma.users.create({
      data: {
        username,
        password: await hash(password),
        email,
      },
    });
    return res.json({
      user: response,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
    });
  }
};
