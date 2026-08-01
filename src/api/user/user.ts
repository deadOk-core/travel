import api from "../client";
import {
  EditPasswordProfileSchema,
  EditUserProfileSchema,
  UserSchema,
  type TEditPassword,
  type TEditProfile,
  type TUser,
} from "./user.types";

// Получение пользователя

export const getUser = async (): Promise<TUser> => {
  const { data } = await api.get("/api/user");
  return UserSchema.parse(data);
};

export const editProfile = async (
  dataUser: TEditProfile,
  photoFile?: File | null,
) => {
  const formData = new FormData();

  if (dataUser.full_name) formData.append("full_name", dataUser.full_name);
  if (dataUser.city) formData.append("city", dataUser.city);
  if (dataUser.bio) formData.append("bio", dataUser.bio);

  if (photoFile) {
    formData.append("photo", photoFile);
  }

  const { data } = await api.post("/api/user", formData);
  return EditUserProfileSchema.parse(data);
};

export const editPassword = async (dataPassword: TEditPassword) => {
  const { data } = await api.patch("/api/user/password", {
    password: dataPassword.newPassword,
  });
  return EditPasswordProfileSchema.parse(data);
};