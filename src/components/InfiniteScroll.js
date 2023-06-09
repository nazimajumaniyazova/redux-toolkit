import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AsyncTodoItem from './AsyncTodoItem';
import { fetchInfiniteTodo } from '../store/asyncTodoSlice';
function InfiniteScroll() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  const { infiniteTodos, infiniteTodosIsLodaing } = useSelector(
    (state) => state.asyncTodos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      if (isFetching) {
        try {
          await dispatch(
            fetchInfiniteTodo({ page: currentPage, limit: 10 })
          ).unwrap();
          setCurrentPage((currentPage) => (currentPage = currentPage + 1));
        } finally {
          setIsFetching(false);
        }
      }
    }
    fetchData();
  }, [dispatch, currentPage, isFetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        e.target.documentElement.scrollTop -
        window.innerHeight <
      100
    ) {
      setIsFetching(true);
    }
  };

  return (
    <div id='result'>
      {infiniteTodosIsLodaing && <p className='info-block'>Loading...</p>}

      {infiniteTodos.map((todo, index) => (
        <AsyncTodoItem key={index} {...todo} />
      ))}
    </div>
  );
}

export default InfiniteScroll;
