import React, { memo, type JSX } from "react";
import styles from "./Styles.module.scss";

type TButton = {
  children?: React.ReactNode;
  color?: "light" | "dark" | "transparent" | "invisible";
  onClick?: () => void | string;
  size?: "s" | "m";
  centered?: boolean;
  type?: "button" | "submit"
  disabled?: boolean
};

const ButtonComponent = ({
  children,
  color = "light",
  onClick,
  size = "m",
  centered,
  type = "button",
  disabled,
}: TButton): JSX.Element => {
  return (
    <button
      className={`${styles.button} ${styles[`button_${color}`]} ${styles[`button_${size}`]} ${centered && styles.button_centered}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const Button = memo(ButtonComponent);
