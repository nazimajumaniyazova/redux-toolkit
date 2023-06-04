import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

function AddTodoForm() {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  const handleAdd = () => {
    if (todoText.trim().length) {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
    return;
  };
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAdd();
        console.log('been here');
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });
  return (
    <>
      <input
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        type='text'
        id='input'
        placeholder='enter your task'
      />
      <p id='emptyInput'></p>
      <button id='submit' onClick={handleAdd}>
        add task
      </button>
    </>
  );
}

export default AddTodoForm;
