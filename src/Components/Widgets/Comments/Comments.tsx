import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByID } from "../../../api/posts/posts";
import { queryClient } from "../../../api/queryClient";
import styles from "./Styles.module.scss";

const CommentsComponent = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Неверный URL. Нет ID поста</div>;
  }

  const comments = useQuery(
    {
      queryFn: () => getCommentsByID(id),
      queryKey: ["comments", id],
    },
    queryClient,
  );

  const commentsData = comments.data;

return commentsData && commentsData.length > 0 ? (
  <ul className={styles.comm__list}>
    {commentsData.map((comment, id) => (
      <li key={id} className={styles.comm__item}>
        <article className={styles.comm}>
          <p className={styles.comm__name}>{comment.author_name}</p>
          <p className={styles.comm__date}>
            {new Date(comment.created_at).toLocaleDateString("ru-RU")}
          </p>
          <p className={styles.comm__text}>{comment.comment}</p>
        </article>
      </li>
    ))}
  </ul>
) : null;
};

export const Comments = memo(CommentsComponent);
