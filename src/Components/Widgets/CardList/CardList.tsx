import { memo } from "react";

import { Card } from "../Card/Card";
import styles from "./Style.module.scss";
import { usePagination, type TCardDataArray } from "../../../Hooks/Pagination";
import { Paginate } from "../../UI/Pagination/Paginate";
import { Button } from "../../UI/Button/Button";
import type { TGetPosts } from "../../../api/posts/posts.types";
import { useAuth } from "../../../api/auth/AuthContext";

type TCards = {
  cards: TGetPosts[];
}

const CardListComponent = ({cards}: TCards) => {
  const {isAuth} = useAuth()
  const dataCards: TCardDataArray = {
    data: cards,
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
