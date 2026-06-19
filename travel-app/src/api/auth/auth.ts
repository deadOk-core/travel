import { BASE_URL } from "../client";
import {
  LogoutSchema,
  RegisterSchema,
  type TLogout,
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
  if (!response.ok) {
    // Сервер вернул ошибку
    throw new Error(data.message || data.error || `Ошибка ${response.status}`);
  }
  console.log(data)
  return RegisterSchema.parse(data);
};




export const logout = async (): Promise<TLogout> => {
    const response = await fetch(`${BASE_URL}/api/logout`, {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    });
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const data = await response.json();
    const validateData = LogoutSchema.parse(data)
    return validateData
};