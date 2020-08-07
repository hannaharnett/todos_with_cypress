import React, { useState, useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import Button from './Button';
import './TodoList.scss';

const TodoList = () => {
  const [list, setList] = useState([
    { id: 1, text: "Make bread" },
    { id: 2, text: "Buy flowers" }
  ]);
  const [todo, setTodo] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState(null);
  const inputRef = useRef();

  const generateId = () => {
    if (list && list.length) {
      return Math.max(...list.map((todo) => todo.id)) + 1;
    } else {
      return 1;
    }
  };

  const displayError = () => {
    setShowError(true);
    const timer = setTimeout(() => setShowError(false), 3000);
    return () => clearTimeout(timer);
  };

  const createTodoItem = () => {
    if (!todo) {
      displayError();
      return;
    }
    const newId = generateId();
    const newTodo = { id: newId, text: todo };
    setList([...list, newTodo]);
    setTodo("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createTodoItem();
    }
  };

  const handleInput = (e) => {
    let todo = e.target.value;
    if (todo.trim().length === 0) {
      todo = "";
    }
    setTodo(todo);
  };

  const deleteTodoItem = (id) => {
    setList(list.filter((todo) => {
      if (todo.id === id) setMessage(`${todo.text} is deleted`);
      return todo.id !== id
    }));
    const timer = setTimeout(() => setMessage(null), 3000);
    return clearTimeout(timer);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const todoItems = list.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} deleteTodoItem={deleteTodoItem} />
  });
  return (
    <main aria-live="polite">
      <section>
        <h1>Todos</h1>
        <div className="background-container">
          <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
            <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
          </svg>
        </div>
        <div className="todo-input">
          <input
            data-cy="new-todo-input"
            type="text"
            value={todo}
            aria-label="Please enter todo item"
            placeholder="Add todo here..."
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            ref={inputRef}
          />
          <Button
            dataCy="addTodo"
            ariaLabel="Add item"
            action={createTodoItem}
            icon="fas fa-plus"
          >

          </Button>
        </div>
        <p>{showError && "Please add a todo"}</p>
        <p className="visually-hidden">{message}</p>
        <div className="todo-content">
          <ul className="todo-list">
            {todoItems}
          </ul>
        </div>
      </section>
    </main >
  )
};

export default TodoList;