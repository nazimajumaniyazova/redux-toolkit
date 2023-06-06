import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteTodo } from '../store/asyncTodoSlice';
function AsyncTodoItem({ id, completed, title, isDeleting }) {
  //const { isDeleting } = useSelector((state) => state.asyncTodos);
  const dispatch = useDispatch();
  return (
    <div
      className='tasks'
      style={{
        backgroundColor: completed ? 'rgba(255, 255, 255, 0.1)' : '',
      }}
    >
      <span
        style={{
          textDecoration: completed ? 'line-through' : '',
        }}
      >
        {title}
      </span>
      <span className='options fa-3x'>
        <span
          className={`fas trashIcon ${isDeleting || 'fa-trash-alt'}`}
          onClick={() => dispatch(deleteTodo({ id }))}
        >
          {isDeleting && <i className='fas fa-spinner fa-spin'></i>}
        </span>
      </span>
    </div>
  );
}

export default AsyncTodoItem;
