import { z } from "zod";

// Получение всех постов
export const PostsShema = z.object({
  city: z.string(),
  county: z.string(),
  id: z.number(),
  title: z.string(),
  excerpt: z.string(),
  photo: z.string(),
});
export type TGetPosts = z.infer<typeof PostsShema>;

//получить пост по id

export const GetPostByIDShema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  county: z.string(),
  city: z.string(),
  photo: z.string(),
  comments: z.array(
    z.object({
      author_name: z.string(),
      comment: z.string(),
      created_at: z.iso.datetime(),
    }),
  ),
  userInfo: z.object({
    full_name: z.string(),
    city: z.string(),
    bio: z.string(),
  }),
});

export type TGetPostByID = z.infer<typeof GetPostByIDShema>;

export const GetCommentsByIDShema = z.array(
  z.object({
    author_name: z.string(),
    comment: z.string(),
    created_at: z.iso.datetime(),
  }),
);

export type TGetCommentsByID = z.infer<typeof GetCommentsByIDShema>;


// export const AddCommentShema = z.array(
//   z.object({
//   full_name: z.string(),
//   comment: z.string()
//   }),
// );

// export type TAddCommentShema = z.infer<typeof AddCommentShema>;


export const AddOneCommentShema = 
  z.object({
    author_name: z.string(),
    comment: z.string(),
    created_at: z.iso.datetime(),
  })


export type TAddOneCommentShema = z.infer<typeof AddOneCommentShema>;


//Создать новый пост

export const CreatePostSchema = 
  z.object({
    title: z.string(),
    description: z.string(),
    country: z.string(),
    city: z.string(),
    photo: z.string().optional(),
  })

export type TCreatePostSchema = z.infer<typeof CreatePostSchema>;

export const CreatePostResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  photo: z.string(),
  comments: z.array(z.unknown()).optional().default([]),
  userInfo: z.object({
    full_name: z.string(),
    city: z.string(),
    country: z.string().optional().default(''),
    bio: z.string(),
  }),
});

export type TCreatePostResponse = z.infer<typeof CreatePostResponseSchema>;