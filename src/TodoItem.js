import React, { useRef } from 'react';
import Button from './Button';
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
      <Button
        dataCy="deleteTodo"
        ariaLabel={`Delete ${todo.text}`}
        action={() => deleteTodoItem(todo.id)}
        icon="fas fa-trash"
      />
    </li>
  )
}

export default TodoItem;