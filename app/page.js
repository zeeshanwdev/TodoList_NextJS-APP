"use client";

import { useState, useEffect } from "react";
import { handleSubmit } from "./actions/form.js";
import { handleDelete } from "./actions/delete.js";
import { handleEdit } from "./actions/edit.js"; 
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null); 
  const [todoText, setTodoText] = useState(""); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (editTodo) {
      await handleEdit(editTodo._id, todoText, setTodos);
      setEditTodo(null);
    } else {
      const formData = new FormData(e.target);
      await handleSubmit(formData, setTodos);
    }

    setTodoText("");
  };

  return (
    <>
      <div className="flex justify-center flex-col h-[20vh] items-center gap-5 mt-30">
        <h1 className="text-2xl font-bold">TodoList</h1>

        {session ? (
          <form onSubmit={handleFormSubmit} className="flex gap-4">
            <input
              className="border border-black p-2"
              type="text"
              name="todo"
              placeholder="Enter Your Todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              required
            />
            <button className="bg-purple-500 p-2 text-white rounded-2xl">
              {editTodo ? "Update" : "Submit"}
            </button>
          </form>
        ) : (
          <p className="text-slate-400">Please sign in to add a todo.</p>
        )}
      </div>

      <div className="bg-purple-800 h-1 opacity-50 w-1/3 mx-auto"></div>

      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-center flex-col items-center mt-6"
          >
            <ul className="w-1/3 mx-auto flex flex-col gap-4">
              <li className="flex justify-inline items-center gap-8">
                <div className="flex gap-2">
                  {session && (
                    <>
                      {/* Edit Icon */}
                      <lord-icon
                        onClick={() => {
                          setEditTodo(todo);
                          setTodoText(todo.todos);
                        }}
                        className="w-8 h-8"
                        src="https://cdn.lordicon.com/cbtlerlm.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#c69cf4,tertiary:#ebe6ef,quaternary:#000000,quinary:#3a3347"
                      ></lord-icon>

                      {/* Delete Icon */}
                      <lord-icon
                        onClick={() => handleDelete(todo._id, setTodos)}
                        className="w-8 h-8"
                        src="https://cdn.lordicon.com/nhqwlgwt.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#c69cf4,tertiary:#646e78,quaternary:#ebe6ef"
                      ></lord-icon>
                    </>
                  )}
                </div>
                <span>{todo.todos}</span>
              </li>
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Add Some Todos...</p>
      )}
    </>
  );
}
