import React from 'react';
import AddTodoForm from './addTodoRofm';
import TodoList from './TodoList';
function SimpleTodo() {
  return (
    <div className='flex_c'>
      <div className='info-block'>
        <p>changes todos order by drag and drop</p>
        <p>press Enter or click add task button to add todo</p>
      </div>
      <AddTodoForm />

      <TodoList></TodoList>
      {/* <button id='rmvbtn'>
    delete selected<i class='fas fa-trash-alt'></i>
  </button> */}
    </div>
  );
}

export default SimpleTodo;
