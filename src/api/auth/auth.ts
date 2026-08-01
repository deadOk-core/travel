import api from "../client";
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
  const { data } = await api.post("/api/register", { email, password });
  return RegisterSchema.parse(data);
};

export const login = async (
  email: string,
  password: string,
): Promise<TRegister> => {
  const { data } = await api.post("/api/login", { email, password });
  return RegisterSchema.parse(data);
};

export const logout = async (): Promise<TLogout> => {
  const { data } = await api.get("/api/logout");
  return LogoutSchema.parse(data);
};