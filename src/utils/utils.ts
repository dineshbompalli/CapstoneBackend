import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Error while hash");
  }
};

export const compare = async (password: string, hash: string) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
