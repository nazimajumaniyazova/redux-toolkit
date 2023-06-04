import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleTodo } from '../store/todoSlice';

function TodoItem({ text, id, completed }) {
  const [isEditing, setIsediting] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsediting(true);
  };
  const handleSave = (e) => {
    dispatch(editTodo({ id, editValue }));
    setIsediting(false);
  };
  const handleCnacel = () => {
    setEditValue(text);
    setIsediting(false);
  };

  return (
    <div
      className='tasks'
      data-id={id}
      style={{
        backgroundColor: completed ? 'rgba(255, 255, 255, 0.1)' : '',
      }}
    >
      <label
        style={{
          textDecoration: completed ? 'line-through' : '',
          display: isEditing ? 'none' : '',
        }}
      >
        {text}
      </label>
      <input
        type='text'
        className={isEditing ? 'editing-active' : 'edit'}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />
      <span className='options'>
        <span
          className='fas fa-check-circle doneIcon'
          style={{ display: isEditing ? 'none' : '' }}
          onClick={() => dispatch(toggleTodo(id))}
        ></span>
        <span
          className='fas fa-trash-alt trashIcon'
          onClick={() => dispatch(deleteTodo(id))}
        ></span>
        <span
          className='fas fa-pencil-alt editIcon'
          style={{ display: isEditing ? 'none' : '' }}
          onClick={() => handleEdit()}
        ></span>
        <span
          className='edit-options'
          style={{ display: isEditing ? '' : 'none' }}
        >
          <span className='fas fa-check saveIcon' onClick={handleSave}></span>
          <span
            className='fas fa-times cancelIcon'
            onClick={handleCnacel}
          ></span>
        </span>
      </span>
    </div>
  );
}

export default TodoItem;
/*   <span>
        <span className='fas fa-square checkIcon'></span>
        <span className='far fa-square uncheckIcon'></span> 
        </span>*/
/**
 *  <span className='fas fa-star importantIcon'></span>
    <span className='far fa-star notImportantIcon'></span> 
 */
