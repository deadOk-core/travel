import z from "zod";

const UserSchema = z.object({
    bio: z.string(),
    city: z.string(),
    country: z.string(),
    full_name: z.string(),
    id: z.number(),
    photo: z.string(),
})

export type TUser = z.infer<typeof UserSchema>