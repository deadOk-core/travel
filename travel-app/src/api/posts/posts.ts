export type TGetPosts = {
  city: string;
  county: string;
  id: number;
  title: string;
  excerpt: string;
  photo: string;
};

export const getPosts = async (): Promise<TGetPosts[]> => {
    const response = await fetch(`https://travelblog.skillbox.cc/api/posts`);
    if (!response.ok) {
        throw new Error(`HTTP getPosts ${response.status}`);
    }
    const data: TGetPosts[] = await response.json();
    console.log(data)
    return data
};