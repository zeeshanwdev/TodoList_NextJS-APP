export const handleSubmit = async (formData, setTodos) => {
    const todoText = formData.get("todo");
  
    if (!todoText) {
      console.error("Todo text is missing!");
      return;
    }
  
    try {
      console.log("Sending Todo:", todoText);
  
      const response = await fetch("http://localhost:5000/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todos: todoText }),
      });
  
      const result = await response.json();
      console.log("Server Response:", result);
  
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
  
      console.log("Todo added successfully");
  
      setTodos((prevTodos) => [...prevTodos, result.todo]); 
  
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  