export const handleDelete = async (id, setTodos) => {
  try {
    console.log("Attempting to delete todo with ID:", id); // ✅ Debugging

    const response = await fetch(`http://localhost:5000/delete-todo/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.statusText}`);
    }

    console.log("Todo deleted successfully, updating state...");

    // ✅ Update state after successful deletion
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
