import React, { useState } from "react";
import "./App.css";

//use destructuring to bring in props -- what is this?
function Todo({ todo, index, deleteTodo }) {
  return (
    <div className="todo">
      {todo}
      <span>
        <button onClick={() => deleteTodo(index)}>Complete</button>
      </span>
    </div>
  );
}

//We're passing in addTodo, which is a function in another component that we'll define later that will add the todo to our list. Here, we're simply collecting the value from the user through a form
function TodoForm({ addTodo }) {
  const [value, setVal] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    //if value is empty then return
    if (!value) return;
    addTodo(value);
    setVal("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          placeholder="Add todo..."
          onChange={event => setVal(event.target.value)}
        />
      </form>
    </div>
  );
}

export default function App() {
  //First word here is similar to this.state
  //Second word is similar to this.setState
  //You can set the values for these things
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet some friends for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const addTodo = textUser => {
    const newTodo = [
      ...todos,
      {
        text: textUser,
        isCompleted: false
      }
    ];
    setTodos(newTodo);
  };

  const deleteTodo = index => {
    let newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
  };
  return (
    <div className="app">
      <div className="title">
        <h1>React To-Do (with hooks!)</h1>
        <h3>Built by: Ibrahim Ali</h3>
      </div>

      <div className="input">
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo.text}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
