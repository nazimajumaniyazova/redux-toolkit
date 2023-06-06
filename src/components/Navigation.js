import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to='/'>SimpleTodo</NavLink>
      </li>
      <li>
        <NavLink to='/async'>AsyncTodo</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
