import { z } from 'zod'
import { GetCommentsByIDShema, GetPostByIDShema, PostsShema, type TGetCommentsByID, type TGetPostByID, type TGetPosts } from './posts.types';
import { BASE_URL } from '../client';

// Получение всех постов

const PostsArrayShema = z.array(PostsShema)

export const getPosts = async (): Promise<TGetPosts[]> => {
    const response = await fetch(`${BASE_URL}/api/posts`);
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const data = await response.json();
    const validateData = PostsArrayShema.parse(data)
    console.log(data)
    return validateData
};



export const getPostByID = async (id: string): Promise<TGetPostByID> => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    });
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const data = await response.json();
    const validateData = GetPostByIDShema.parse(data)
    console.log(data)
    return validateData
};

export const getCommentsByID = async (id: string): Promise<TGetCommentsByID> => {
    const response = await fetch(`${BASE_URL}/api/posts/${id}/comments`, {
      headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    });
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const data = await response.json();
    const validateData = GetCommentsByIDShema.parse(data)
    console.log(data)
    return validateData
};