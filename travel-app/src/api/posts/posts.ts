import { z } from 'zod'
import { PostsShema, type TGetPosts } from './posts.types';
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
    return validateData
};