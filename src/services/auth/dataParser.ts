import { RegisterInput } from "../../inputTypes/user.types";
import { hashPassword } from "./bcrypt";

export const parseRegisterData: (
  data: RegisterInput
) => Promise<RegisterInput> = async (data) => {
  const hashedPassword = await hashPassword(data.password as string);

  return { ...data, password: hashedPassword };
};
