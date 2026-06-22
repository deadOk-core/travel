import { memo } from "react";

import { Card } from "../Card/Card";
import styles from "./Style.module.scss";
import { usePagination, type TCardDataArray } from "../../../Hooks/Pagination";
import { Paginate } from "../Pagination/Paginate";
import { Button } from "../Button/Button";
import type { TGetPosts } from "../../../api/posts/posts.types";
import { useAuth } from "../../../api/auth/AuthContext";
import { getPostByID } from "../../../api/posts/posts";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";


type TCards = {
  cards: TGetPosts[];
}

const CardListComponent = ({cards}: TCards) => {
  const {isAuth} = useAuth()
  const dataCards: TCardDataArray = {
    data: cards, // Поле должно называться data, а не cards
  };

  const { currentCards, pageCount, setCurrentPage, currentPage } = usePagination(dataCards);

  return (
    <>
      <ul className={styles.cards_list}>
        {currentCards.map((card) => (
          <li className={styles.cards_list__item} key={card.id}>
            <Card data={card} />
          </li>
        ))}
      </ul>

      <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      
      <Button centered disabled={!isAuth}>Добавить мое путешествие</Button>
      {!isAuth && <span className="error">Чтобы добавить пост необходимо зарегистрироваться</span>}
    </>
  );
};

export const CardList = memo(CardListComponent);
