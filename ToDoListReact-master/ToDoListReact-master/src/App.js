import React, { useEffect, useState } from "react";
import service from "./service";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const data = await service.getTasks();
    setTodos(data);
  }

  async function createTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await service.addTask(newTodo);
    setNewTodo("");
    fetchTodos();
  }

  async function updateCompleted(todo, checked) {
    await service.setCompleted(todo.id, todo.name, checked);
    fetchTodos();
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="Add a task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.isComplete ? "completed" : ""}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={(e) =>
                    updateCompleted(todo, e.target.checked)
                  }
                />
                <label>{todo.name}</label>
                <button
                  className="destroy"
                  onClick={() => deleteTodo(todo.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;
