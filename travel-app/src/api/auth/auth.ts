import { BASE_URL } from "../client";
import {
  RegisterSchema,
  type TRegister,
} from "./auth.types";

export const register = async (
  email: string,
  password: string,
): Promise<TRegister> => {
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


export const login = async (
  email: string,
  password: string,
): Promise<TRegister > => {
  const response = await fetch(`${BASE_URL}/api/login`, {
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