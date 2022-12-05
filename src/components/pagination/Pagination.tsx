import { FC, useState } from 'react';
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'

interface IPaginationProps {
  onPageChange: (currentPage: number) => void 
  currentPage: number
  pagesAmount: number
}

export const Pagination: FC<IPaginationProps> = ({ currentPage, pagesAmount, onPageChange }) => {

  return (
    <div>
      <ReactPaginate
        pageCount={pagesAmount}
        onPageChange={(currentPage) => onPageChange(currentPage.selected + 1)}
        forcePage={currentPage - 1}
        breakLabel={'...'}
        previousLabel={'<'}
        nextLabel={'>'}
        className={s.pagination}
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
