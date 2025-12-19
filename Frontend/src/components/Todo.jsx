import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL;

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

const fetchTodos = async () => {
  try {
    const res = await axios.get(API);

    // 🔐 safety check
    if (Array.isArray(res.data)) {
      setTodos(res.data);
    } else {
      setTodos([]);
      console.error("API did not return array:", res.data);
    }
  } catch (err) {
    console.error(err);
    setTodos([]);
  }
};

  const addTodo = async () => {
    if (!title) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await axios.put(`${API}/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="input-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
  {Array.isArray(todos) &&
    todos.map((todo) => (
      <li key={todo._id}>
       <span
  onClick={() => toggleTodo(todo._id)}
  className={todo.completed ? "completed" : ""}
>
  {todo.title}
</span>

        <button onClick={() => deleteTodo(todo._id)}>❌</button>
      </li>
    ))}
</ul>

    </>
  );
}
