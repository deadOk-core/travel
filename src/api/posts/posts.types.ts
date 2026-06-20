import { z } from 'zod'

// Получение всех постов
export const PostsShema = z.object({
 city: z.string(),
  county: z.string(),
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  photo: z.string(),
}) 
export type TGetPosts = z.infer<typeof PostsShema>

//