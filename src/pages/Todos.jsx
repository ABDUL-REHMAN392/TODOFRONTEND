import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/todo/", {
        withCredentials: true,
      });
      if (res.data.status) setTodos(res.data.data);
      else setTodos([]);
    } catch (err) {
      setTodos([]);
      console.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:4000/api/todo/",
        { title: newTodo },
        { withCredentials: true }
      );
      if (res.data.status) {
        setNewTodo("");
        fetchTodos();
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/todo/${id}`, {
        withCredentials: true,
      });
      if (res.data.status) setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const updateTodo = async (id) => {
    if (!editingText.trim()) return;
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/todo/${id}`,
        { title: editingText },
        { withCredentials: true }
      );
      if (res.data.status) {
        cancelEditing();
        fetchTodos();
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading todos...
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        My Todo List
      </h1>

      {/* Input */}
      <div className="flex w-full max-w-xl gap-3 mb-8">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 border border-gray-300"
        />
        <button
          onClick={addTodo}
          className="bg-blue-900 hover:bg-blue-950 transition text-white font-bold px-5 rounded-xl shadow"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No todos yet.</p>
      ) : (
        <ul className="w-full max-w-xl space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              {editingId === todo._id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                  <button
                    onClick={() => updateTodo(todo._id)}
                    className="bg-green-400 hover:bg-green-500 p-2 rounded-xl text-white"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-400 hover:bg-gray-500 p-2 rounded-xl text-white"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-900 font-medium">
                    {todo.title}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(todo)}
                      className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-xl text-white"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="bg-red-500 hover:bg-red-600 p-2 rounded-xl text-white"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
