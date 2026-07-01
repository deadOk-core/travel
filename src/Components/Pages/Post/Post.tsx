import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostByID } from "../../../api/posts/posts";
import { queryClient } from "../../../api/queryClient";
import styles from "./Styles.module.scss";
import { Comments } from "../../Widgets/Comments/Comments";
import { Button } from "../../UI/Button/Button";
import { Loader } from "../../UI/Loader/Loader";

const PostComponent = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Неверный URL. Нет ID поста</div>;
  }

  const post = useQuery(
    {
      queryFn: () => getPostByID(id),
      queryKey: ["post", id],
    },
    queryClient,
  );

  const postData = post.data;

  return postData ? (
    <section className={styles.post}>
      <img
        className={styles.post__img}
        src={`https://travelblog.skillbox.cc${postData.photo}`}
      ></img>

      <div className={styles.post__text}>
        <h2 className={styles.post__title}>{postData.title}</h2>
        {postData.description
          .split(". ")
          .filter((sentence) => sentence.trim())
          .map((sent, id) => {
            const normalSentence = sent.trim().endsWith(". ")
              ? sent.trim()
              : sent.trim() + ".";
            return (
              <p className={styles.post__paragraph} key={id}>
                {normalSentence}
              </p>
            );
          })}

        <Comments />

        <div className={styles.post__buttons}>
          <Link to={"/"}>
            <Button color="transparent">← Назад</Button>
          </Link>
          <Link to={`/post/${postData.id}/comment`}>
          <Button>Ваше впечатление об этом месте</Button>
          </Link>
        </div>
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export const Post = memo(PostComponent);
