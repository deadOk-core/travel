import { memo } from "react";
import styles from './Style.module.scss'


type PaginateProps = {
  pageCount: number[];
  setCurrentPage: (page:number)=>void;
  currentPage: number;
};

const PaginateComponent = ({pageCount, setCurrentPage, currentPage}: PaginateProps) => {
  return (
    
      <ul className={styles.pag_list}>
        {pageCount.map((number) => (
          <li className={`${styles.pag_list_item} `} key={number}>
            <button className={`${styles.pag_list__button} ${currentPage === number? styles.pag_list__active : undefined}`} onClick={()=>setCurrentPage(number)}>{number}</button>
          </li>
        ))}
      </ul>
  );
};

export const Paginate = memo(PaginateComponent);
