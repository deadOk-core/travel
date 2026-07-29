import { memo, useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import { Button } from "../Button/Button";
import close from "../../../Assets/close.svg";

export type TPopup = {
  title: string;
};

const PopupComponent = ({ title }: TPopup) => {
  const [isOpen, SetIsOpen] = useState(true);

  const handleClickAway = (evt: KeyboardEvent) => {
    if (evt.key == "Escape") {
      SetIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleClickAway);
      
    }

    return () => window.removeEventListener("keydown", handleClickAway);


  }, [isOpen]);

  const handleOverlay = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      SetIsOpen(false);
    }
  };

  return (
    isOpen && (
        <div className={styles.overlay} onClick={handleOverlay}>
      <div className={styles.popup} >
        <p className={styles.popup__title}>{title}</p>
        <Button
          color="invisible"
          className={styles.popup__close}
          onClick={() => SetIsOpen(false)}
        >
          <img src={close} alt="close" />
        </Button>
      </div>
      </div>
    )
  );
};

export const Popup = memo(PopupComponent);
