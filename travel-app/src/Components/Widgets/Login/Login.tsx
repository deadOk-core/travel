import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth/auth";
import { memo } from "react";
import { queryClient } from "../../../api/queryClient";
import styles from "./Style.module.scss";
import { Button } from "../Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { TRegister } from "../../../api/auth/auth.types";
import { useAuth } from "../../../api/auth/AuthContext";

const formSchema = z.object({
  email: z.email("Некорректный формат email"),
  password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
});

type FormState = z.infer<typeof formSchema>;

const RegisterComponent = () => {
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
      mutationFn: (data: FormState) => login(data.email, data.password),
      onSuccess: (data: TRegister) => {
        setTokenState(data.token);
        window.location.href = "/";
      },
      onError: (error) => {
        setError("form", {
          type: "server",
          message: "Неправильный логин или пароль",
        });
      },
    },
    queryClient,
  );

  const onSubmit = (data: FormState) => {
    loginMutation.mutate(data);
    console.log(data);
  };

  return (
    <>
      <h2 className={styles.title}>Вход в профиль</h2>
      {errors.form && (
        <span className={styles.form__error} style={{ padding: "10px 0" }}>
          {errors.form.message}
        </span>
      )}
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

        <label className={styles.form__label}>
          <span className={styles.form__title}>Пароль</span>
          <input
            className={`${styles.form__input} ${errors.password && styles.form__input_error}`}
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            {...registerField("password")}
          />
          {errors.password && (
            <span className={styles.form__error}>
              {errors.password.message}
            </span>
          )}
        </label>
        <div className={styles.form__buttons}>
          <Link to={"/register"}>
            <Button color="light">Зарегистрироваться</Button>
          </Link>
          <Button color="transparent" type="submit">
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};

export const Login = memo(RegisterComponent);
function loginState(token: string, user: any): unknown {
  throw new Error("Function not implemented.");
}

function setTokenState(token: string): unknown {
  throw new Error("Function not implemented.");
}
