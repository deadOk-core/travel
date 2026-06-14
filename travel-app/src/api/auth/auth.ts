import { BASE_URL } from "../client";
import {
  RegisterSchema,
  RegisterSchemaError,
  type TRegister,
  type TRegisterError,
} from "./auth.types";

export const register = async (
  email: string,
  password: string,
): Promise<TRegister | TRegisterError> => {
  const response = await fetch(`${BASE_URL}/api/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  console.log(data);
  return RegisterSchema.parse(data);
};
