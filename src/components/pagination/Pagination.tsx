import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../scss/pagination.scss'

export const Pagination = () => {

  const onPageChange = (page: {selected: number}) => {
    console.log(page.selected);
    
  }

  return (
    <div>
      <ReactPaginate
        pageCount={10}
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        onPageChange={onPageChange}
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
