import { useState } from "react"

import type { TGetPosts } from "../api/posts/posts.types";

export type TCardDataArray = {
  data: TGetPosts[];
};

export const usePagination = ({data}: TCardDataArray) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage] = useState<number>(6);

    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards = data.slice(firstCardIndex, lastCardIndex)
    const totalPages = Math.ceil(data.length / cardsPerPage);

    const pageCount = []

    for(let i = 1; i <= totalPages; i++) {
        pageCount.push(i)
    }
    return({ currentCards, currentPage, setCurrentPage, totalPages, pageCount })
}