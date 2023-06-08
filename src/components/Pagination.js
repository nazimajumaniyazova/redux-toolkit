import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchTodos } from '../store/asyncTodoSlice';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const { todosTotalAmount } = useSelector((state) => state.asyncTodos);
  const dispatch = useDispatch();

  const pages = [];
  let pagesToShow = 5;
  let startFromNumber = 1;
  const pageLimit = 10;
  const totalPages = Math.ceil(todosTotalAmount / pageLimit);

  function definePages() {
    if (totalPages <= pagesToShow) {
      startFromNumber = 1;
      pagesToShow = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startFromNumber = 1;
      } else if (
        currentPage + Math.floor((pagesToShow - 1) / 2) >=
        totalPages
      ) {
        startFromNumber = totalPages - (pagesToShow - 1);
      } else {
        startFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }
    for (let i = 1; i <= pagesToShow; i++) {
      pages.push(startFromNumber++);
    }
  }
  definePages();

  const handlePagination = (page) => {
    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    setCurrentPage(page);
    dispatch(fetchTodos({ page }));
  };
  return (
    <ul className='pagination'>
      <li>
        <button
          disabled={currentPage === 1 ? true : false}
          onClick={() => handlePagination(1)}
        >
          Start
        </button>
      </li>
      <li>
        <button
          disabled={currentPage === 1 ? true : false}
          onClick={() => handlePagination(currentPage - 1)}
        >
          previous
        </button>
      </li>
      {pages.map((page, index) => (
        <li key={index}>
          <button
            className={currentPage === page ? 'active' : ''}
            onClick={() => handlePagination(page)}
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button
          disabled={currentPage === totalPages ? true : false}
          onClick={() => handlePagination(currentPage + 1)}
        >
          next
        </button>
      </li>
      <li>
        <button
          disabled={currentPage === totalPages ? true : false}
          onClick={() => handlePagination(totalPages)}
        >
          last
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
