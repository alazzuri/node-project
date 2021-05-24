import { sign, verify, Secret } from "jsonwebtoken";
import { enviroment } from "../../../config/enviroment";

const { JWT_SECRET } = enviroment;

export const signWithJwt: (payload: object) => string = (payload) =>
  sign(payload, JWT_SECRET as Secret);

export const verifyWithJwt: (token: string) => string | object = (token) =>
  verify(token, JWT_SECRET as Secret);
