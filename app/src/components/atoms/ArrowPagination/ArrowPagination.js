import React from 'react';
import { Pagination, LeftArrow, RightArrow } from './ArrowPagination.style';

const ArrowPagination = ({ paginate, currentPage }) => {
  return (
    <Pagination>
      <LeftArrow onClick={() => paginate(-1)} />
      {currentPage}
      <RightArrow onClick={() => paginate(1)} />
    </Pagination>
  );
};

export default ArrowPagination;
