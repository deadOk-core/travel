import React, { memo, type JSX } from "react";
import styles from "./Styles.module.scss";

type TForm = {
  children?: React.ReactNode;
  onSubmit: () => void;
};

const FormComponent = ({ children, onSubmit }: TForm): JSX.Element => {
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
    </form>
  );
};

export const Form = memo(FormComponent);
