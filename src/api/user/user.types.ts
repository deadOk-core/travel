import z from "zod";

//пользователь
export const UserSchema = z.object({
    bio: z.string(),
    city: z.string(),
    country: z.string(),
    full_name: z.string(),
    id: z.number(),
    photo: z.string(),
})

export type TUser = z.infer<typeof UserSchema>

//для изменения профиля
export const EditUserProfileSchema = z.object({
    bio: z.string(),
    city: z.string(),
    full_name: z.string(),
    photo: z.string(),
})

export type TEditProfile = Partial<z.infer<typeof EditUserProfileSchema>>



//для изменения пароля
export const EditPasswordProfileSchema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
})

export type TEditPassword = z.infer<typeof EditPasswordProfileSchema>



