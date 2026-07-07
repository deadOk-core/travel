import z from "zod";

export const AddNewPostFormSchema = z.object({
    title: z.string().min(1, "Заголовок не может быть пустым"),
    description: z.string().min(1, "Описание не может быть пустым"),
    country: z.string().min(1, "Страна не может быть пустым"),
    city: z.string().min(1, "Город не может быть пустым"),
    photo: z.string().optional(),
}) 

export type TAddNewPostFormSchema = z.infer<typeof AddNewPostFormSchema>;