export const handleEdit = async (id, updatedTodo, setTodos) => {
    try {
      const response = await fetch(`http://localhost:5000/edit-todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todos: updatedTodo }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
  
      const updatedData = await response.json();
  
      // ✅ Update the UI with the new todo value
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, todos: updatedTodo } : todo
        )
      );
  
      console.log("Todo updated successfully:", updatedData);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  