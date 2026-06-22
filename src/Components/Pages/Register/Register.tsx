import { useMutation } from "@tanstack/react-query";
import { register } from "../../../api/auth/auth";
import { memo } from "react";
import { queryClient } from "../../../api/queryClient";
import styles from "./Styles.module.scss";
import { Button } from "../../Widgets/Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { TRegister } from "../../../api/auth/auth.types";
import { useAuth } from "../../../api/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    email: z.email("Некорректный формат email"),
    password: z.string().min(6, "Введите минимум 6 символов"),
    confirmPassword: z.string().min(1, "Пароль не может быть пустым"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type FormState = z.infer<typeof formSchema>;

const LoginComponent = () => {
  const navigate = useNavigate()
  const { setTokenState } = useAuth();
  const {
    register: registerField, // переименовываем, чтобы не конфликтовало
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: (data: FormState) => register(data.email, data.password),
      onSuccess: (data: TRegister) => {
        setTokenState(data.token);
        navigate('/profile')
      },
      onError: () => {
        setError("email", {
          type: "server",
          message: "Аккаунт с данным email уже существует",
        });
      },
    },
    queryClient,
  );

  const onSubmit = (data: FormState) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <h2 className={styles.title}>Регистрация</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className={styles.form__label}>
          <span className={styles.form__title}>Логин</span>
          <input
            className={`${styles.form__input} ${errors.email && styles.form__input_error}`}
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...registerField("email")}
          ></input>
          {errors.email && (
            <span className={styles.form__error}>{errors.email.message}</span>
          )}
        </label>

        <div className={styles.btn_container}>
          <label className={styles.form__label}>
            <span className={styles.form__title}>Пароль</span>
            <input
              className={`${styles.form__input} ${errors.password && styles.form__input_error}`}
              type="password"
              placeholder="Пароль"
              autoComplete="new-password"
              {...registerField("password")}
            />
            {errors.password && (
              <span className={styles.form__error}>
                {errors.password.message}
              </span>
            )}
          </label>

          <label className={styles.form__label}>
            <span className={styles.form__title}>Подтвердите пароль</span>
            <input
              className={`${styles.form__input} ${errors.confirmPassword && styles.form__input_error}`}
              type="password"
              placeholder="Пароль"
              autoComplete="new-password"
              {...registerField("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className={styles.form__error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
        </div>
        <div className={styles.form__buttons}>
          <Button color="light" type="submit" centered>
            Зарегистрироваться
          </Button>
          {/* <Button color="transparent" >
            Войти
          </Button> */}
        </div>
      </form>
    </>
  );
};

export const Register = memo(LoginComponent);
