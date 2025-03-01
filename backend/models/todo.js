import mongoose from "mongoose"
let Schema = mongoose.Schema


let todoSchema = new Schema({
    todos: String,
})


let Todo = mongoose.model("Todo", todoSchema);

export default Todo