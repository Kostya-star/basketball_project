import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'
import {ReactComponent as PreviousLabel} from '../../assets/icons/pagination__left.svg'
import {ReactComponent as NextLabel} from '../../assets/icons/pagination__right.svg'

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
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        previousLabel={<PreviousLabel/> }
        nextLabel={<NextLabel/>}
        className={s.pagination}
      />
    </div>
  );
};
