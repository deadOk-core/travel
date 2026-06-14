import { memo, useEffect, useState } from 'react';
import styles from './Styles.module.scss'

const LoaderComonent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const balls = 3;
    const ballsArr =[]
    for(let i = 0; i<balls; i++){
        ballsArr.push(i)
    }

    useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % balls);
    }, 300); // Каждые 0.3 секунды

    return () => clearInterval(interval); // Очистка
  }, []);
  
    return(
        <div>
            <ul className={styles.list}>
                {ballsArr.map(item => (
                    <li key={item} className={`${styles.list__item} ${activeIndex === item? styles.list__item_up : ""}`}></li>
                ))}
            </ul>
        </div>
    )
}

export const Loader = memo(LoaderComonent);