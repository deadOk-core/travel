import { memo } from "react";
import { useParams } from "react-router-dom";
import styles from './Styles.module.scss'

const AddCommentComponent = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Неверный URL. Нет ID поста</div>;
  }

  return (
      <div className={styles.cover}>
asaa
      </div>
  )

};

export const AddComment = memo(AddCommentComponent);
