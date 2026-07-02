import { memo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Styles.module.scss";
import { CoverBackground } from "../../UI/CoverBackground/CoverBackground";
import { Form } from "../../UI/Form/Form";
import { useForm } from "react-hook-form";
import { CommentFormSchema, type TCommentFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../UI/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { addComment } from "../../../api/posts/posts";
import { useAuth } from "../../../api/auth/AuthContext";
import type { TAddOneCommentShema } from "../../../api/posts/posts.types";

const AddCommentComponent = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!id) {
    return <div>Неверный URL. Нет ID поста</div>;
  }

  const newComment = useMutation(
    {
      mutationFn: (newComment: TCommentFormSchema) =>
        addComment(id, newComment),
      mutationKey: ["newComment"],
      onSuccess: (data: TAddOneCommentShema) => {
        console.log(data);
        navigate(`/post/${id}`);
      },
    },
    queryClient,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<TCommentFormSchema>({ resolver: zodResolver(CommentFormSchema) });

  const maxCommentLength = 2000;
  const currentComment = watch("comment", "");
  const currentCommentLength = currentComment ? currentComment.length : 0;

  const onSubmit = (data: TCommentFormSchema) => {
    newComment.mutate(data);
    console.log(data);
  };

  return (
    <CoverBackground>
      <h2 className={styles.title}>Добавление отзыва</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.form__label}>
          <span className={styles.form__title}>Ваше имя</span>
          <input
            className={`${styles.form__input} ${errors.full_name && styles.form__input_error}`}
            type="text"
            placeholder="Ваше имя"
            defaultValue={user?.full_name || ""}
            {...register("full_name")}
          ></input>
          {errors.full_name && (
            <span className={styles.form__error}>
              {errors.full_name.message}
            </span>
          )}
        </label>

        <label className={`${styles.form__label} ${styles.form__label_comm}`}>
          <span className={styles.form__title}>Отзыв</span>
          <textarea
            className={`${styles.form__input} ${styles.form__input_comm} ${errors.comment && styles.form__input_error}`}
            maxLength={maxCommentLength}
            rows={4}
            placeholder="Добавьте текст отзыва"
            {...register("comment")}
          ></textarea>
          <div className={styles.form__label_cover}>
            {errors.comment && (
              <span className={styles.form__error}>
                {errors.comment.message}
              </span>
            )}
            <span className={styles.form__counter}>
              {`${currentCommentLength} / ${maxCommentLength}`}
            </span>
          </div>
        </label>

        <div className={styles.form__buttons}>
          <Link to={`/post/${id}`}>
            <Button color="transparent">← Назад</Button>
          </Link>
          <Button type="submit">Сохранить</Button>
        </div>
      </Form>
    </CoverBackground>
  );
};

export const AddComment = memo(AddCommentComponent);
