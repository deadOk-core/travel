import { useMutation } from "@tanstack/react-query";
import { register } from "../../../api/auth/auth";
import { memo } from "react";
import { queryClient } from "../../../api/queryClient";
import styles from "./Style.module.scss";
import { Button } from "../Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const formSchema = z.object({
  email: z.email("Некорректный формат email"),
  password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
});

type FormState = z.infer<typeof formSchema>;

const RegisterComponent = () => {
  const {
    register: registerField, // переименовываем, чтобы не конфликтовало
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: (data: FormState) => register(data.email, data.password),
    },
    queryClient,
  );

  const onSubmit = (data: FormState) => {
    loginMutation.mutate(data);
    console.log(data)
  };


  return (
    <>
      <h2 className={styles.title}>Вход в профиль</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.form__label}>
          <span className={styles.form__title}>Логин</span>
          <input
            className={styles.form__input}
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
            className={styles.form__input}
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
          <Button color="light">Зарегистрироваться</Button>
          <Button color="transparent" type="submit">
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};

export const Register = memo(RegisterComponent);
