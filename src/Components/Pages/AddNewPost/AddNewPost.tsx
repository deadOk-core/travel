import { memo, useState } from "react";
import { CoverBackground } from "../../UI/CoverBackground/CoverBackground";
import styles from "./Styles.module.scss";
import { useForm } from "react-hook-form";
import { AddNewPostFormSchema, type TAddNewPostFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../UI/Form/Form";
import { Input } from "../../UI/Input/Input";
import { Button } from "../../UI/Button/Button";
import { Link } from "react-router-dom";

const AddNewPostComponent = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAddNewPostFormSchema>({
    resolver: zodResolver(AddNewPostFormSchema),
  });

  const maxInfoLength = 2000;
  const infoValue = watch("description", "");
  const infoLength = infoValue ? infoValue.length : 0;

  const onSubmit = () => {
    console.log();
  };

  return (
    <CoverBackground>
      <h2 className={styles.title}>Добавление истории о путешествии</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Link to={'/'}>
          <Button color="transparent" >← Назад</Button>
            </Link>
          <Button type="submit">Сохранить</Button>
        </div>
      </Form>
    </CoverBackground>
  );
};

export const AddNewPost = memo(AddNewPostComponent);
