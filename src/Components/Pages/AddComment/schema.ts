import z from "zod";

export const CommentFormSchema = z.object({
  full_name: z.string().min(1, "Напишите имя"),
  comment: z.string().min(1, "Добавьте текст отзыва").max(2000, "Слишком много символов"),
});


export type TCommentFormSchema = z.infer<typeof CommentFormSchema>