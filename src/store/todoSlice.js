import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const getTodos = () => {
  let todos = localStorage.getItem('todos');

  if (!todos) {
    return [];
  } else {
    return JSON.parse(todos);
  }
};

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
const initialState = { todos: getTodos() };
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: uuidv4(),
        text: action.payload,
        completed: false,
      });
      saveTodos(state.todos);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
      saveTodos(state.todos);
    },
    toggleTodo(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      toggledTodo.completed = !toggledTodo.completed;
      saveTodos(state.todos);
    },
    editTodo(state, action) {
      const editedTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      editedTodo.text = action.payload.editValue;
      saveTodos(state.todos);
    },
    reoderTodo(state, action) {
      state.todos = action.payload;
      saveTodos(state.todos);
    },
  },
});

export const todoReducer = todoSlice.reducer;
export const { addTodo, deleteTodo, toggleTodo, editTodo, reoderTodo } =
  todoSlice.actions;
