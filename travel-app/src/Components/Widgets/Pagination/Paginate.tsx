import { memo } from "react";
import styles from './Style.module.scss'


type PaginateProps = {
  pageCount: number[];
  setCurrentPage: (page:number)=>void;
};

const PaginateComponent = ({pageCount, setCurrentPage}: PaginateProps) => {
  return (
    
      <ul className={styles.pag_list}>
        {pageCount.map((number) => (
          <li className={styles.pag_list_item} key={number}>
            <button className={styles.pag_list__button} onClick={()=>setCurrentPage(number)}>{number}</button>
          </li>
        ))}
      </ul>
  );
};

export const Paginate = memo(PaginateComponent);
