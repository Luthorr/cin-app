import React from 'react';
import { PaginationElement, PaginationWrapper } from './Pagination.style';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderElements = () => {
    const pagElements = [];
    for (
      let i = currentPage - 3 < 1 ? 1 : currentPage - 3;
      i < currentPage + 5 && i <= pageNumbers.length;
      i += 1
    ) {
      pagElements.push(
        <PaginationElement
          key={i}
          onClick={() => paginate(i)}
          active={i === currentPage}
        >
          {i}
        </PaginationElement>
      );
    }
    return pagElements;
  };

  return (
    <PaginationWrapper>
      <PaginationElement onClick={() => paginate(1)}>&laquo;</PaginationElement>
      {/* {pageNumbers.map((number) => (
        <PaginationElement
          onClick={() => paginate(number)}
          active={number === currentPage}
        >
          {number}
        </PaginationElement>
      ))} */}
      {renderElements()}
      <PaginationElement onClick={() => paginate(pageNumbers.length)}>
        &raquo;
      </PaginationElement>
    </PaginationWrapper>
  );
};

export default Pagination;
