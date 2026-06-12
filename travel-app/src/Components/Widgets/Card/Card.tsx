import React from "react";
import { memo } from "react";
import timeLogo from "../../../Assets/time-card.jpg";
import styles from "./Style.module.scss";
import type { TGetPosts } from "../../../api/posts/posts";



type TCardData = {
  data: TGetPosts;
};

const CardComponent = ({ data }: TCardData): React.JSX.Element => {
  return (
    <article className={styles.card}>
      <img className={styles.card_img} src={`https://travelblog.skillbox.cc${data.photo}`}></img>
      <div className={styles.text_block}>
        <div className={styles.text_block_cover1}>
          <h2 className={styles.text_block_title}>{data.title}</h2>
          <p className={styles.text_block_excerpt}>{data.excerpt}</p>
        </div>

        <div className={styles.text_block_cover2}>
          <p
            className={styles.text_block_country}
          >{`${data.county}, ${data.city}`}</p>
          <a className={styles.text_block_link}>Подробнее</a>
        </div>
      </div>
    </article>
  );
};

export const Card = memo(CardComponent);
