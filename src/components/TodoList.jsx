import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        const titles = data.map(todo => todo.title);
        setTodos(titles);
      })
  }, []); 

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((title) => (
          <li>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
