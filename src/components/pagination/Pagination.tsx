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
      />
    </div>
  );
};
