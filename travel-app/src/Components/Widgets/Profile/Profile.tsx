import { memo } from "react";
import styles from "./Styles.module.scss";
import { useAuth } from "../../../api/auth/AuthContext";
import editIcon from "/src/Assets/edit_profile_icon.svg";
import { Link } from "react-router-dom";

const ProfileComponent = () => {
  const { user } = useAuth();
  return (
    <div className={styles.profile}>
      <div className={styles.profile__avatar}>
        <img
          className={styles.profile__img}
          src={
            user?.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCT14bv5q-M8koLAjZeTO91Su-vYa2eKnbmA&s"
          }
        ></img>
      </div>

      <div className={styles.profile__info}>
        <div className={styles.profile__name}>
          <h2 className={styles.profile__title} >{user?.full_name === "" ? `user${user.id}` : user?.full_name}</h2>
          <Link to={'/profile/edit'}>
          <img className={styles.profile__edit} src={editIcon}></img>
          </Link>
        </div>
        <span className={styles.profile__text}>
          <p className={styles.profile__dt}>Город:</p>
          <p className={styles.profile__dd}>{user?.city === "" ? `Вы не указали из какого вы города` : user?.city}</p>
        </span>

        <span className={styles.profile__text}>
          <p className={styles.profile__dt}>О себе:</p>
          <p className={styles.profile__dd}>{user?.bio === "" ? `Вы не указали инофрмацию о себе` : user?.bio}</p>
        </span>
      </div>
    </div>
  );
};

export const Profile = memo(ProfileComponent);
