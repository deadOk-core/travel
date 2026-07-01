import React, { memo, type JSX } from "react";
import styles from "./Styles.module.scss";

type TInput = {
  children?: React.ReactNode;
  color?: "light";
  onClick?: () => void;
  size?: "s";
  type: "password" | "email" | "text";
  isRequired?: boolean;
};

const InputComponent = ({
  children,
  color = "light",
  onClick,
  size = "s",
  type,
  isRequired = false,
}: TInput): JSX.Element => {
  return (
    <input
      className={`${styles.input} ${styles[`input_${color}`]} ${styles[`input_${size}`]} ${isRequired && styles.input__required}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </input>
  );
};

export const Input = memo(InputComponent);
