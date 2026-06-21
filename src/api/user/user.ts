import { BASE_URL } from '../client';
import { EditUserProfileSchema, type TEditPassword, type TEditProfile,  type TUser } from './user.types';

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



// api/user/user.api.ts
export const editProfile = async (data: TEditProfile, photoFile?: File | null) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  
  // Добавляем текстовые поля (только если не пустые)
  if (data.full_name) formData.append('full_name', data.full_name);
  if (data.city) formData.append('city', data.city);
  if (data.bio) formData.append('bio', data.bio);
  // Добавляем фото как ФАЙЛ (не строка)
  if (photoFile) {
    formData.append('photo', photoFile); // сам файл
  }
  
  const response = await fetch(`${BASE_URL}/api/user`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }
  
  const responseData = await response.json();
  return responseData ;
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