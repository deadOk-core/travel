import { memo, useState } from "react";
import { CoverBackground } from "../../UI/CoverBackground/CoverBackground";
import styles from "./Styles.module.scss";
import { useForm } from "react-hook-form";
import { AddNewPostFormSchema, type TAddNewPostFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../UI/Form/Form";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { createPost } from "../../../api/posts/posts";
import type { TCreatePostSchema } from "../../../api/posts/posts.types";

const AddNewPostComponent = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAddNewPostFormSchema>({
    resolver: zodResolver(AddNewPostFormSchema),
    defaultValues: {
        title: "",
        description: "",
        country: "",
        city: "",
        photo: "",
    },
  });
  
  // const hasChanges = Object.keys(dirtyFields).length > 0 || photoFile !== null;
  const newPost = useMutation(
    {
      mutationFn: ({
        data,
        photoFile,
      }: {
        data: TCreatePostSchema;
        photoFile: File | null;
      }) => createPost(data, photoFile),
      onSuccess:(data)=> {
        setPhotoFile(null)
        navigate(`/post/${data.id}`)
      },
      onError:(error)=>{
        console.log(error)
      },
    },
    
    queryClient,
  );

  const maxInfoLength = 2000;
  const infoValue = watch("description", "");
  const infoLength = infoValue ? infoValue.length : 0;

  const onSubmit = (data: TAddNewPostFormSchema) => {
    console.log(data);
    newPost.mutate({ data, photoFile });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    console.log(file, 'тут файл')
  };

  return (
    <CoverBackground>
      <h2 className={styles.title}>Добавление истории о путешествии</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        
          <label>
            <input
              className={styles.post__selectPhoto}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              // {...register("photo")}
            />
            <a className={styles.post__changePhoto}>Изменить фото</a>
          </label>
        
        <Input
          label="Заголовок"
          required
          type="text"
          placeholder="Заголовок"
          error={errors.title?.message}
          {...register("title")}
        />

        <div className={styles.post__cover}>
          <Input
            label="Страна"
            required
            type="text"
            placeholder="Страна"
            error={errors.country?.message}
            {...register("country")}
          />

          <Input
            label="Город"
            required
            type="text"
            placeholder="Город"
            error={errors.city?.message}
            {...register("city")}
          />
        </div>

        <Input
          textarea
          counter={`${infoLength} / ${maxInfoLength}`}
          label="Описание"
          placeholder="Добавьте описание вашей истории "
          error={errors.description?.message}
          {...register("description")}
        />

        <div className={styles.post__buttons}>
          <Link to={"/"}>
            <Button color="transparent">← Назад</Button>
          </Link>
          <Button type="submit" >Сохранить</Button>
        </div>
      </Form>
    </CoverBackground>
  );
};

export const AddNewPost = memo(AddNewPostComponent);
