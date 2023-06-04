import './App.css';
import TodoList from './components/TodoList';

import AddTodoForm from './components/addTodoRofm';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <div className='flex_c'>
          <h1 className='head'>
            ToDo List<i className='fas fa-clipboard-list headIcon'></i>
          </h1>
          <AddTodoForm />
          <TodoList></TodoList>
          {/* <button id='rmvbtn'>
            delete selected<i class='fas fa-trash-alt'></i>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
