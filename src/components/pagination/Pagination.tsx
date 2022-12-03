import { FC, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../scss/pagination.scss'


interface IPaginationProps {
  onPageChange: (currentPage: number) => void 
  currentPage: number
}

export const Pagination: FC<IPaginationProps> = ({ currentPage, onPageChange }) => {

  return (
    <div>
      <ReactPaginate
        pageCount={10}
        onPageChange={(currentPage) => onPageChange(currentPage.selected + 1)}
        forcePage={currentPage - 1}
        breakLabel={'...'}
        previousLabel={'<'}
        nextLabel={'>'}
        containerClassName={'pagination'}
        pageClassName={'pagination__page'}
        pageLinkClassName={'pagination__link'}
        previousClassName={'pagination__page'}
        previousLinkClassName={'pagination__link'}
        nextClassName={'pagination__page'}
        nextLinkClassName={'pagination__link'}
        // breakClassName={'pagination__page'}
        // breakLinkClassName={'pagination__link'}
      />
    </div>
  );
};
