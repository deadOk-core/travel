// Header.tsx
import { memo, useState } from "react";
import styles from "./Styles.module.scss";
import mainTopImg from "../../../Assets/main-top.jpg";
import logo from "../../../Assets/logo.svg";
import { Button } from "../Button/Button";
import { register } from "../../../api/auth/auth";
import { Link } from "react-router-dom";


const HeaderComponent = () => {
  const handleButton = () => {
    const data = register("emaasgdasgdil@email.com", "123asdgdfagadfgadsg45")
    console.log(data)
  }
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

        <Link to={"/register"}>
        <Button color="invisible" onClick={handleButton}>Войти</Button>
      </Link>
      </nav>
      
      <h1 className={styles.title}>Там, где мир начинается с путешествий</h1>
    </header>
    </>
  );
};

export const Header = memo(HeaderComponent);
