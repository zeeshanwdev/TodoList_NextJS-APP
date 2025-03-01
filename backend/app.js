import express from "express"
import Todo from "./models/todo.js"
import mongoose from "mongoose"
import cors from "cors";


const port = 5000
const mongo_url = "mongodb://127.0.0.1:27017/todolist"

const app = express()
app.use(cors());
app.use(express.json()); 

//Database
main().then(()=>console.log("Database is Connected")).catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongo_url);
}


app.get('/', (req, res) =>{
    res.send("HelloWorld")
})


app.get("/posts", async (req, res) => {
    try {
      let posts = await Todo.find();                                                                  
      res.json(posts);                                                                              
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  });


  
  app.post("/add-todo", async (req, res) => {
    try {
      const { todos } = req.body;
  
      console.log("Received Todo:", todos); 
  
      if (!todos) {
        console.error("Todo text is missing in request body");
        return res.status(400).json({ message: "Todo text is required" });
      }
  
      const newTodo = new Todo({ todos });
      await newTodo.save();
  
      console.log("Todo saved in DB:", newTodo); 
  
      res.status(201).json({ message: "Todo added successfully", todo: newTodo });
    } catch (error) {
      console.error("Error saving todo:", error);
      res.status(500).json({ message: "Error saving todo", error });
    }
  });


  app.delete("/delete-todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Received delete request for ID:", id); 
  
      const deletedTodo = await Todo.findByIdAndDelete(id);
  
      if (!deletedTodo) {
        console.error("Todo not found in database!");
        return res.status(404).json({ message: "Todo not found" });
      }
  
      console.log("Todo deleted from database:", deletedTodo);
      res.json({ message: "Todo deleted successfully", id });
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ message: "Error deleting todo", error });
    }
  });


  app.put("/edit-todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { todos } = req.body;
  
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { todos },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      res.json({ message: "Todo updated successfully", updatedTodo });
    } catch (error) {
      res.status(500).json({ message: "Error updating todo", error });
    }
  });
  
  
  
  


app.listen(port, () => console.log(`Example app listening on port ${port}!`))