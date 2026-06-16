import { z } from 'zod'
// import { PostsShema, type TGetPosts } from './posts.types';
import { BASE_URL } from '../client';
import type { TUser } from './user.types';

// Получение пользователя

// const PostsArrayShema = z.array(PostsShema)

export const getUser = async (): Promise<TUser> => {
    const response = await fetch(`${BASE_URL}/api/user`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data
    // const validateData = PostsArrayShema.parse(data)
    // return validateData
};