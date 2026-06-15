// Header.tsx
import { memo, useState } from "react";
import styles from "./Styles.module.scss";
import mainTopImg from "../../../Assets/main-top.jpg";
import logo from "../../../Assets/logo.svg";
import { Button } from "../Button/Button";
import { register } from "../../../api/auth/auth";
import { Link, useLocation } from "react-router-dom";


const HeaderComponent = () => {

  const location = useLocation();
  location.pathname
  
  return (
    <>
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${mainTopImg})` }}
    >
      <div className={styles.overlay}></div>

      <nav className={styles.cover}>
        <Link to={'/'}>
        <div className={styles.cover_logo}>
          <img className={styles.cover__img} src={logo} alt="Логотип"></img>
          <p className={styles.cover__subtitle}>Travel</p>
        </div>
        </Link>

        <Link to={"/login"}>
        <Button color="invisible">Войти</Button>
      </Link>
      </nav>
      
      <h1 className={styles.title}>{ location.pathname ==='/' ? "Там, где мир начинается с путешествий": "Истории ваших путешествий"}</h1>
    </header>
    </>
  );
};

export const Header = memo(HeaderComponent);
