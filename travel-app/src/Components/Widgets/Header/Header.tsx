// Header.tsx
import { memo } from "react";
import styles from "./Styles.module.scss";
import mainTopImg from "../../../Assets/main-top.jpg";
import logo from "../../../Assets/logo.svg";

const HeaderComponent = () => {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${mainTopImg})` }}
    >
      <div className={styles.overlay}></div>

      <nav className={styles.cover}>
        <div className={styles.cover_logo}>
          <img className={styles.cover__img} src={logo} alt="Логотип"></img>
          <p className={styles.cover__subtitle}>Travel</p>
        </div>

        <button className={styles.cover__button}>Войти</button>
      </nav>
      <h1 className={styles.title}>Там, где мир начинается с путешествий</h1>
    </header>
  );
};

export const Header = memo(HeaderComponent);
