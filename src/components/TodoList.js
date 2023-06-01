import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  // const handleDelete = (event) => {
  //   const target = event.target;
  //   const targetParent = event.target.closest('.tasks');
  //   const targetId = targetParent.getAttribute('data-id');
  //   if (target.classList.contains('trashIcon')) {
  //     dispatch(deleteTodo(targetParent.getAttribute('data-id')));
  //   } else if (target.classList.contains('doneIcon')) {
  //     dispatch(toggleTodo(targetId));
  //   } else if (target.classList.contains('editIcon')) {
  //     //dispatch(editTodo(targetId));
  //     setIsediting(true);
  //   }
  // };
  return (
    <div id='result'>
      {todos.map((todo, index) => (
        <TodoItem
          text={todo.text}
          key={todo.id}
          order={++index}
          id={todo.id}
          completed={todo.completed}
        ></TodoItem>
      ))}
    </div>
  );
}

export default TodoList;
