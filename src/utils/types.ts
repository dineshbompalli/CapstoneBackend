import { users } from "@prisma/client";

export type Login = {
  username: string;
  password: string;
};

export type SignUp = {
  username: string;
  password: string;
  email: string;
};

export type UserResponse = {
  userdetails?: users;
  status: boolean;
  message?: string | null;
};
