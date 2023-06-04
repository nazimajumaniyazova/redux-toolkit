import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { reoderTodo } from '../store/todoSlice';
function TodoList() {
  const todos = useSelector((state) => state.todos.todos);

  const dispatch = useDispatch();
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (source.index === destination.index) return;
    if (type === 'group') {
      const reorderedTodos = [...todos];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedTodo] = reorderedTodos.splice(sourceIndex, 1);
      reorderedTodos.splice(destinationIndex, 0, removedTodo);
      dispatch(reoderTodo(reorderedTodos));
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <Droppable droppableId='ROOT' type='group'>
        {(provided) => (
          <div id='result' {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable draggableId={todo.id} index={index} key={todo.id}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <TodoItem {...todo} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
