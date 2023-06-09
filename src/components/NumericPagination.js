import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchTodos } from '../store/asyncTodoSlice';
import AsyncTodoItem from './AsyncTodoItem';
import Pagination from './Pagination';

function NumericPagination() {
  const { asyncTodos, isLoading, error, isDeleting } = useSelector(
    (state) => state.asyncTodos
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos({ page: 1 }));
  }, [dispatch]);
  return (
    <>
      <div id='result'>
        {isLoading && <p className='info-block'>Loading...</p>}
        {error && (
          <p className='info-block'>{error}. Please refresh the page</p>
        )}
        {asyncTodos.map((todo) => (
          <AsyncTodoItem key={todo.id} {...todo} isDeleting={isDeleting} />
        ))}
      </div>
      <Pagination />
    </>
  );
}

export default NumericPagination;
