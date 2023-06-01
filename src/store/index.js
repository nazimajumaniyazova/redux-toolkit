import { todoReducer } from './todoSlice';

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
