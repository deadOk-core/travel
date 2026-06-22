import { z } from 'zod'
import { GetPostByIDShema, PostsShema, type TGetPostByID, type TGetPosts } from './posts.types';
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
    const response = await fetch(`${BASE_URL}/api/posts`, {
        body: JSON.stringify(id)
    });
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const data = await response.json();
    const validateData = GetPostByIDShema.parse(data)
    console.log(data)
    return validateData
};