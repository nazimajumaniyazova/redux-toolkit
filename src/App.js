import { Route, Routes } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';

import AddTodoForm from './components/addTodoRofm';
import SimpleTodo from './components/SimpleTodo';
import AsyncTodo from './components/AsyncTodo';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <div className='header'>
          <h1 className='head'>
            ToDo List<i className='fas fa-clipboard-list headIcon'></i>
          </h1>
          <Navigation />
        </div>

        <Routes>
          <Route path='/' element={<SimpleTodo />}></Route>
          <Route path='/async' element={<AsyncTodo />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
