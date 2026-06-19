import { BASE_URL } from '../client';
import { type TEditPassword, type TEditProfile,  type TUser } from './user.types';

// Получение пользователя

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
};



export const editProfile = async (data: TEditProfile) => {
    const response = await fetch(`${BASE_URL}/api/user`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      full_name: data.full_name,
      city: data.city,
      bio: data.bio,
      photo: data.photo,

    })
  });
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const datsa = await response.json();
    console.log(data)
    return datsa
};


export const editPassword = async (data: TEditPassword) => {
    const response = await fetch(`${BASE_URL}/api/user/password`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify({
      password: data.newPassword
    })
  });
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const datsa = await response.json();
    console.log(data)
    return datsa
};