import { NavLink, Outlet } from 'react-router-dom';

function AsyncTodo() {
  return (
    <div>
      <div className='header'>
        <ul>
          <li>
            <NavLink to='/async/numeric'>Numeric pagination</NavLink>
          </li>
          <li>
            <NavLink to='/async/infinite'>Infinite scroll</NavLink>
          </li>
        </ul>
      </div>

      <div className='info-block'>
        <p>As API server was used JSONPlaceholder</p>
      </div>

      <Outlet />
    </div>
  );
}

export default AsyncTodo;
