import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodo',
  async function (params, thunkAPI) {
    thunkAPI.dispatch(emptyTodos());
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=5`
      );
      if (!response.ok) {
        throw new Error('Server Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function (params, thunkAPI) {
    try {
      const respons = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${params.id}`,
        { method: 'DELETE' }
      );
      if (!respons.ok) {
        throw new Error(`Can't not delete todo. Try again`);
      }
      thunkAPI.dispatch(delteTodo(params.id));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  asyncTodos: [],
  isLoading: false,
  error: null,
  isDeleting: false,
};
const asyncTodosSlice = createSlice({
  name: 'asyncTodos',
  initialState,
  reducers: {
    emptyTodos(state, action) {
      state.asyncTodos = [];
    },
    delteTodo(state, action) {
      state.asyncTodos = state.asyncTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.asyncTodos = action.payload;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.isDeleting = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isDeleting = false;
      });
  },
});

const { emptyTodos, delteTodo } = asyncTodosSlice.actions;

export const asyncTodos = asyncTodosSlice.reducer;
