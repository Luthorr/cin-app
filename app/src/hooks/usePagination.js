import { useState } from 'react';

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return { currentPage, paginate };
};
