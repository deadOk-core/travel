import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Styles.module.scss'
import { CoverBackground } from "../../UI/CoverBackground/CoverBackground";
import { Form } from "../../UI/Form/Form";
import { useForm } from "react-hook-form";
import { CommentFormSchema, type TCommentFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../UI/Button/Button";

const AddCommentComponent = () => {
  const { id } = useParams<{ id: string }>();

  
  const { handleSubmit,
    register, formState :{errors},
    watch
  } = useForm<TCommentFormSchema>({resolver: zodResolver(CommentFormSchema)})

  const maxCommentLength = 2000;
  const currentComment = watch('comment', '')
  const currentCommentLength = currentComment ? currentComment.length : 0;

  if (!id) {
    return <div>Неверный URL. Нет ID поста</div>;
  }
  
  const onSubmit = () => {
    console.log()
  }

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
            {...register("full_name")}
          ></input>
          {errors.full_name && (
            <span className={styles.form__error}>{errors.full_name.message}</span>
          )}
        </label>

        <label className={styles.form__label}>
          <span className={styles.form__title}>Отзыв</span>
          <textarea
            className={`${styles.form__input} ${styles.form__input_comm} ${errors.comment && styles.form__input_error}`}
            maxLength={maxCommentLength}
            rows={4}
            placeholder="Добавьте текст отзыва"
            {...register("comment")}
          ></textarea>
          <span
            className={styles.form__counter}
          >{`${currentCommentLength} / ${maxCommentLength}`}</span>
          {errors.comment && (
            <span className={styles.form__error}>{errors.comment.message}</span>
          )}
        </label>

        <div className={styles.form__buttons}>
          <Link to={`/post/${id}`}>
          <Button color='transparent'>← Назад</Button>
          </Link>
          <Button type="submit">Сохранить</Button>

        </div>
          
        </Form>
      </CoverBackground>
  )

};

export const AddComment = memo(AddCommentComponent);
