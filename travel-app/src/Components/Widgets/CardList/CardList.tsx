import { memo } from "react";

import { Card } from "../Card/Card";
import styles from "./Style.module.scss";
import { usePagination, type TCardDataArray } from "../../../Hooks/Pagination";
import { Paginate } from "../Pagination/Paginate";
import { Button } from "../Button/Button";
import type { TGetPosts } from "../../../api/posts/posts.types";


type TCards = {
  cards: TGetPosts[];
}

const CardListComponent = ({cards}: TCards) => {
  const dataCards: TCardDataArray = {
    data: cards, // Поле должно называться data, а не cards
  };

  const { currentCards, pageCount, setCurrentPage } = usePagination(dataCards);

  return (
    <>
      <ul className={styles.cards_list}>
        {currentCards.map((card) => (
          <li className={styles.cards_list__item} key={card.id}>
            <Card data={card} />
          </li>
        ))}
      </ul>

      <Paginate pageCount={pageCount} setCurrentPage={setCurrentPage} />
      <Button centered >Добавить мое путешествие</Button>
    </>
  );
};

export const CardList = memo(CardListComponent);
