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

//получить пост по id

export const GetPostByIDShema = z.object({
   id: z.number(),
  title: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  photo: z.string(),
  comments: z.array(z.object({
    author_name: z.string(),
    comment: z.string(),
    created_at: z.iso.datetime()
  })),
  userInfo: z.object({
    full_name: z.string(),
    city: z.string(),
    bio: z.string()
  })
})

export type TGetPostByID = z.infer<typeof GetPostByIDShema>