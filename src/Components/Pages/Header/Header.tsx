// Header.tsx
import { memo } from "react";
import styles from "./Styles.module.scss";
import logo from "../../../Assets/logo.svg";
import { Button } from "../../UI/Button/Button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../api/auth/AuthContext";
import { FetchUser } from "../../Widgets/FetchUser/FetchUser";

const HeaderComponent = () => {
  const {  isAuth } = useAuth();

  const location = useLocation();
  const mainPage = location.pathname === "/"

  return (
    <>
      <header
        className={styles.header}
      >
        <div className={styles.overlay}></div>

        <nav className={styles.cover}>
          <Link to={"/"}>
            <div className={styles.cover_logo}>
              <img className={styles.cover__img} src={logo} alt="Логотип"></img>
              <p className={styles.cover__subtitle}>Travel</p>
            </div>
          </Link>

          {isAuth ? <FetchUser/> : (
            <Link to={"/login"}>
              <Button color="invisible" >
                Войти
              </Button>
            </Link>
          )}
        </nav>

        <h1 className={styles.title} style={!mainPage? {padding: '40px 0'}: undefined}>
          {mainPage
            ? "Там, где мир начинается с путешествий"
            : "Истории ваших путешествий"}
        </h1>
      </header>
    </>
  );
};

export const Header = memo(HeaderComponent);
