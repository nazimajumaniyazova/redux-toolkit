import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTodo } from '../store/asyncTodoSlice';
function AsyncTodoItem({ id, completed, title }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    setIsDeleting(true);
    await dispatch(deleteTodo({ id })).unwrap();
    setIsDeleting(false);
  };

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
          onClick={() => handleDelete(id)}
        >
          {isDeleting && <i className='fas fa-spinner fa-spin'></i>}
        </span>
      </span>
    </div>
  );
}

export default AsyncTodoItem;
