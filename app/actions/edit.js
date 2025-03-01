export const handleEdit = async (id, updatedText, setTodos) => {
  try {
    const response = await fetch(`http://localhost:5000/edit-todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos: updatedText }),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, todos: updatedText } : todo
      )
    );

    console.log("Todo updated successfully");
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
