import z from "zod";

export const EditProfileSchema = z
  .object({
    full_name: z.string().min(1, "Поле не может быть пустым"),
    city: z.string().min(1, "Поле не может быть пустым"),
    bio: z.string().optional(),
    photo: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.newPassword === "" && data.confirmPassword === "") ||
      data.newPassword === data.confirmPassword,
    {
      error: "Пароли не совпадают",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => {
      // Если пароль заполнен, то минимум 6 символов
      if (data.newPassword && data.newPassword.length < 6) return false;
      return true;
    },
    { message: "Минимум 6 символов", path: ["newPassword"] },
  );

export type FormStateProfile = z.infer<typeof EditProfileSchema>;