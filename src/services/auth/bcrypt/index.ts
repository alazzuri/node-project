import { hash, compare } from "bcrypt";

const saltRounds = 12;

export const hashPassword: (password: string) => Promise<string> = async (
  password
) => {
  try {
    return await hash(password, saltRounds);
  } catch (err) {
    throw new Error("An error ocurred while processing your request");
  }
};

export const validatePassword: (
  inputPassword: string,
  hashedPassword: string
) => Promise<boolean> = async (inputPassword, hashedPassword) =>
  await compare(inputPassword, hashedPassword);
