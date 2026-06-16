import { memo, useEffect, useState } from "react";
import { getPosts } from "../../../api/posts/posts";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import styles from "./Styles.module.scss";
import { Loader } from "../Loader/Loader";
import { getUser } from "../../../api/user/user";
import { login, logout } from "../../../api/auth/auth";
import { useAuth } from "../../../api/auth/AuthContext";
import profileTriangle from "/src/Assets/profile-triangle.svg";

const FetchUserComponent = () => {
  const { setUserState, logoutState } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const userLogout = useQuery(
    {
      queryFn: () => logout(),
      queryKey: ["logout"],
      enabled: false,
    },
    queryClient,
  );
  
  const handleLogout = () => {
    userLogout.refetch()
    logoutState()
    console.log("Вы вышли из аккаунта")
  }

  const userInfo = useQuery(
    {
      queryFn: () => getUser(),
      queryKey: ["user"],
    },
    queryClient,
  );

  useEffect(() => {
    if (userInfo.data) {
      setUserState(userInfo.data);
    }
  }, [userInfo.data]);

  switch (userInfo.status) {
    case "pending":
      return <Loader size="s"/>;
    case "success":
      return (
        <div className={styles.wrapp}>
          <button className={styles.wrapp__profile} onClick={()=>setIsOpen(!isOpen)}>
            <img className={styles.wrapp__img} src={userInfo.data.photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCT14bv5q-M8koLAjZeTO91Su-vYa2eKnbmA&s'}></img>
            <p>
              {userInfo.data.full_name === ""
                ? `user${userInfo.data.id}`
                : userInfo.data.full_name}
            </p>
            <img className={`${styles.wrapp__triangle} ${isOpen ? styles.wrapp__triangle_open : ''}`}  src={profileTriangle}></img>
          </button>

          {isOpen && (
        <div className={styles.wrapp__buttons}>
          <button className={styles.wrapp__buttons_button} onClick={() => { /* переход в профиль */ }}>
            Профиль
          </button>
          <button className={styles.wrapp__buttons_button} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
        </div>
      );
    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
        </div>
      );
  }
};

export const FetchUser = memo(FetchUserComponent);
