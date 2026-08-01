import {
  AddOneCommentShema,
  CreatePostResponseSchema,
  GetCommentsByIDShema,
  GetPostByIDShema,
  PostsArrayShema,
  type TAddOneCommentShema,
  type TCreatePostResponse,
  type TCreatePostSchema,
  type TGetCommentsByID,
  type TGetPostByID,
  type TGetPosts,
} from "./posts.types";
import api from "../client";

// Получение всех постов

export const getPosts = async (): Promise<TGetPosts[]> => {
  const { data } = await api.get("/api/posts");
  return PostsArrayShema.parse(data);
};

export const getPostByID = async (id: string): Promise<TGetPostByID> => {
  const { data } = await api.get(`/api/posts/${id}`);
  return GetPostByIDShema.parse(data);
};

export const getCommentsByID = async (
  id: string,
): Promise<TGetCommentsByID> => {
  const { data } = await api.get(`/api/posts/${id}/comments`);
  return GetCommentsByIDShema.parse(data);
};

export const addComment = async (
  id: string,
  newComment: { full_name: string; comment: string },
): Promise<TAddOneCommentShema> => {
  const { data } = await api.post(`/api/posts/${id}/comments`, newComment);
  return AddOneCommentShema.parse(data);
};

//Создать новый пост

export const createPost = async (
  post: TCreatePostSchema,
  photoFile?: File | null,
): Promise<TCreatePostResponse> => {
  const formData = new FormData();

  if (post.city) formData.append("city", post.city);
  if (post.country) formData.append("country", post.country);
  if (post.description) formData.append("description", post.description);
  if (post.title) formData.append("title", post.title);

  if (photoFile) {
    formData.append("photo", photoFile);
  }
  const { data } = await api.post("/api/posts", formData);

  const response = {
    ...data,
    country: data.county,
  };

  return CreatePostResponseSchema.parse(response);
};
