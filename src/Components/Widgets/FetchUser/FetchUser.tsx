import { memo, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import styles from "./Styles.module.scss";
import { Loader } from "../../UI/Loader/Loader";
import { getUser } from "../../../api/user/user";
import {  logout } from "../../../api/auth/auth";
import { useAuth } from "../../../api/auth/AuthContext";
import profileTriangle from "/src/Assets/profile-triangle.svg";
import { Link, useNavigate } from "react-router-dom";
import { useClickAway } from 'react-use';

const FetchUserComponent = () => {
  const navigate = useNavigate();
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
    navigate('/')
    console.log("Вы вышли из аккаунта")
  }

  const userInfo = useQuery(
    {
      queryFn: () => getUser(),
      queryKey: ["user", localStorage.getItem('token')],
      refetchOnWindowFocus: false, // При возврате на вкладку не обновлять
    },
    queryClient,
  );

  useEffect(() => {
    if (userInfo.data) {
      setUserState(userInfo.data);
    }
  }, [userInfo.data]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  switch (userInfo.status) {
    case "pending":
      return <Loader size="s"/>;
    case "success":
      return (
        <div className={styles.wrapp} ref={dropdownRef}>
          <button className={styles.wrapp__profile} onClick={()=>setIsOpen(!isOpen)}>
            <img className={styles.wrapp__img} src={ `https://travelblog.skillbox.cc${userInfo.data.photo}` || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCT14bv5q-M8koLAjZeTO91Su-vYa2eKnbmA&s'}></img>
            <p>
              {userInfo.data.full_name === ""
                ? `user${userInfo.data.id}`
                : userInfo.data.full_name}
            </p>
            <img className={`${styles.wrapp__triangle} ${isOpen ? styles.wrapp__triangle_open : ''}`}  src={profileTriangle}></img>
          </button>

          {isOpen && (
        <div className={styles.wrapp__buttons}>
          <Link to={'/profile'}>
          <button className={styles.wrapp__buttons_button}>
            Профиль
          </button>
          </Link>
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
