import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const initialState = { todos: [] };
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
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleTodo(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
    editTodo(state, action) {
      const editedTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      editedTodo.text = action.payload.editValue;
    },
    reoderTodo(state, action) {
      state.todos = action.payload;
    },
  },
});

export const todoReducer = todoSlice.reducer;
export const { addTodo, deleteTodo, toggleTodo, editTodo, reoderTodo } =
  todoSlice.actions;
