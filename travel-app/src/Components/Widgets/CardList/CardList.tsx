import { memo, useEffect, useState } from "react";
import { getPosts, type TGetPosts } from "../../../api/posts/posts";
import { Card } from "../Card/Card";
import styles from './Style.module.scss'

const CardListComponent = () => {




  const [cards, setCards] = useState<TGetPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(()=> {
    async function loadPosts() {
      try{
        setLoading(true)
        const posts = await getPosts()
        setCards(posts)
      } catch(error) {
        setError(error instanceof Error ? error.message : 'Произошла ошибка')
      } finally {
        setLoading(false)
      } 
    }
    loadPosts()
  }, [])

  return (
    <ul className={styles.cards_list}>
      {
        cards.map((card, id) => (
          <li key={id}>
            <Card data={card}/>
          </li>
        ))
      }
    </ul>
  );
};

export const CardList = memo(CardListComponent);
