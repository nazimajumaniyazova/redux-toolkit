import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchTodos } from '../store/asyncTodoSlice';
import AsyncTodoItem from './AsyncTodoItem';
import Pagination from './Pagination';

function AsyncTodo() {
  const { asyncTodos, isLoading, error, isDeleting } = useSelector(
    (state) => state.asyncTodos
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos({ page: 1 }));
  }, [dispatch]);

  return (
    <div>
      <div className='info-block'>
        <p>As API server was used JSONPlaceholder</p>
      </div>

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
    </div>
  );
}

export default AsyncTodo;
