import { memo, useEffect } from "react";
import styles from "./Styles.module.scss";
import { useAuth } from "../../../api/auth/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { editPassword, editProfile } from "../../../api/user/user";
import type { TEditPassword } from "../../../api/user/user.types";
import { EditProfileSchema, type FormStateProfile } from "./schema";

const EditProfileComponent = () => {
  const { user } = useAuth();

  //Изменение данных профиля
  const {
    register: registerProfile,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<FormStateProfile>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      city: user?.city || "",
      bio: user?.bio || "",
      photo: user?.photo || "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const hasChanges = Object.keys(dirtyFields).length > 0;

  const editProfileMutation = useMutation(
    {
      mutationFn: (data: FormStateProfile) => editProfile(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        console.log("Профиль обновлён!");
      },
    },
    queryClient,
  );

  const editPasswordMutation = useMutation(
    {
      mutationFn: (data: TEditPassword) => editPassword(data),
    },
    queryClient,
  );

  const onSubmit = (data: FormStateProfile) => {
    editProfileMutation.mutate(data);
    console.log(data);

    const newPassword = (
      document.querySelector('[name="newPassword"]') as HTMLInputElement
    )?.value;
    const confirmPassword = (
      document.querySelector('[name="confirmPassword"]') as HTMLInputElement
    )?.value;

    // Отправляем пароль только если заполнены оба поля
    if (newPassword && confirmPassword) {
      editPasswordMutation.mutate({
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      console.log("Пароль:", { newPassword, confirmPassword });
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || "",
        city: user.city || "",
        bio: user.bio || "",
        photo: user.photo || "",
      });
    }
  }, [user]);

  return (
    <form
      className={styles.editProfile}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.editProfile__avatar}>
        <img
          className={styles.editProfile__img}
          src={
            user?.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCT14bv5q-M8koLAjZeTO91Su-vYa2eKnbmA&s"
          }
        ></img>
        <input type="file" {...registerProfile("photo")} />
      </div>

      <div className={styles.form}>
        <label className={styles.form__label}>
          <span
            className={`${styles.form__title} ${styles.form__title_required}`}
          >
            ФИО
          </span>
          <input
            className={`${styles.form__input} `}
            type="text"
            placeholder="ФИО"
            autoComplete="name"
            {...registerProfile("full_name")}
          />
          {errors.full_name && (
            <span className={styles.form__error}>
              {errors.full_name.message}
            </span>
          )}
        </label>

        <label className={styles.form__label}>
          <span
            className={`${styles.form__title} ${styles.form__title_required}`}
          >
            Город
          </span>
          <input
            className={styles.form__input}
            type="text"
            placeholder="Город"
            autoComplete="address-level2"
            {...registerProfile("city")}
          />
          {errors.city && (
            <span className={styles.form__error}>{errors.city.message}</span>
          )}
        </label>

        <label className={styles.form__label}>
          <span className={styles.form__title}>О себе</span>
          <textarea
            className={`${styles.form__input} ${styles.form__input_bio}`}
            rows={4}
            placeholder="О себе"
            {...registerProfile("bio")}
            // autoComplete="current-password"
          />
          {errors.bio && (
            <span className={styles.form__error}>{errors.bio.message}</span>
          )}
        </label>

        <p className={styles.form__switchPassword}>Смена пароля</p>
        <div className={styles.form__passwords}>
          <label className={styles.form__label}>
            <span
              className={`${styles.form__title} ${styles.form__title_required}`}
            >
              Новый пароль
            </span>
            <input
              className={styles.form__input}
              type="password"
              placeholder="Новый пароль"
              autoComplete="new-password"
              {...registerProfile("newPassword")}
            />
            {errors.newPassword && (
              <span className={styles.form__error}>
                {errors.newPassword.message}
              </span>
            )}
          </label>

          <label className={styles.form__label}>
            <span
              className={`${styles.form__title} ${styles.form__title_required}`}
            >
              Повторите пароль
            </span>
            <input
              className={styles.form__input}
              type="password"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              {...registerProfile("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className={styles.form__error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
        </div>
        <div className={styles.form__buttons}>
          <Link to={"/profile"}>
            <Button color="transparent">Назад</Button>
          </Link>
          <Button color="light" type="submit" disabled={!hasChanges}>
            Сохранить
          </Button>
        </div>
      </div>
    </form>
  );
};

export const EditProfile = memo(EditProfileComponent);