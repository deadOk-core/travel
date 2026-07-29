import { memo } from "react";
import styles from "./Style.module.scss";

type PaginateProps = {
  pageCount: number[];
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

const PaginateComponent = ({
  pageCount,
  setCurrentPage,
  currentPage,
  totalPages,
}: PaginateProps) => {

  // Функция для получения 3-х отображаемых страниц
  const getVisiblePages = () => {
    let start = currentPage;
    let end = currentPage + 2;

    // Корректировка для конца
    if (currentPage >= totalPages - 2) {
      start = totalPages - 2;
      end = totalPages;
    }

    return pageCount.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.pag}>
      <button
      disabled={currentPage === 1}
        className={`${styles.pag_list__button} ${currentPage === 1 ? `${styles.pag_list__active} ${styles.pag_list__edge}` : undefined}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
      <button
      disabled={currentPage === 1}
        className={`${styles.pag_list__button} ${currentPage === 1 ? `${styles.pag_list__active} ${styles.pag_list__edge}` : undefined}`}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        ←
      </button>

      <ul className={styles.pag_list}>
        {visiblePages.map((number) => (
          <li className={`${styles.pag_list_item} `} key={number}>
            <button
              className={`${styles.pag_list__button} ${currentPage === number ? styles.pag_list__active : undefined}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>

      <button
      disabled={currentPage === totalPages}
        className={`${styles.pag_list__button} ${currentPage === totalPages ? `${styles.pag_list__active} ${styles.pag_list__edge}` : undefined}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        →
      </button>
      <button
      disabled={currentPage === totalPages}
        className={`${styles.pag_list__button} ${currentPage === totalPages ? `${styles.pag_list__active} ${styles.pag_list__edge}` : undefined}`}
        onClick={() => setCurrentPage(totalPages)}
      >
        {totalPages}
      </button>
    </div>
  );
};

export const Paginate = memo(PaginateComponent);
