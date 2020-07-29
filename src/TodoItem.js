import React, { useRef } from 'react';
import './TodoItem.scss';

const TodoItem = (props) => {
  const todoItemRef = useRef();
  const { todo, deleteTodoItem } = props;
  return (
    <li
      key={todo.id}
      className="todo-item"
    >
      <p
        ref={todoItemRef}
        tabIndex="0"
        id={todo.text}
      >
        {todo.text}
      </p>
      <button
        className="todo-item-delete"
        aria-label="Delete item"
        onClick={() => deleteTodoItem(todo.id)}
      >
        -
      </button>
    </li>
  )
}

export default TodoItem;