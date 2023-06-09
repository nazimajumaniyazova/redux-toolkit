import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodo',
  async function ({ page, limit = 5 }, thunkAPI) {
    thunkAPI.dispatch(emptyTodos());
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Server Error');
      }
      thunkAPI.dispatch(setTodosTotalAmount(200));
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
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

export const fetchInfiniteTodo = createAsyncThunk(
  'todos/fetchInfiniteTodo',
  async function ({ page, limit = 5 }, thunkAPI) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Server Error');
      }
      thunkAPI.dispatch(setTodosTotalAmount(200));
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
    }
  }
);
const initialState = {
  asyncTodos: [],
  isLoading: false,
  error: null,
  isDeleting: false,
  todosTotalAmount: null,
  infiniteTodos: [],
  infiniteTodosIsLodaing: false,
};
const asyncTodosSlice = createSlice({
  name: 'asyncTodos',
  initialState,
  reducers: {
    emptyTodos(state, action) {
      state.asyncTodos = [];
    },
    setTodosTotalAmount(state, action) {
      state.todosTotalAmount = action.payload;
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
      })
      .addCase(fetchInfiniteTodo.fulfilled, (state, action) => {
        state.infiniteTodos.push(...action.payload);
        state.infiniteTodosIsLodaing = false;
      })
      .addCase(fetchInfiniteTodo.pending, (state, action) => {
        state.infiniteTodosIsLodaing = true;
      });
  },
});

const { emptyTodos, delteTodo, setTodosTotalAmount } = asyncTodosSlice.actions;

export const asyncTodos = asyncTodosSlice.reducer;
