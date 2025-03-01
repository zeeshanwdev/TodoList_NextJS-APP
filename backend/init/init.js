import mongoose from "mongoose";
import Todo from "../models/todo.js";
import initData from "./data.js";



let mongo_url = "mongodb://127.0.0.1:27017/todolist";
main()
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}


let sampleData = async ()=>{
    await Todo.insertMany(initData.data)
    console.log("SampleData Initilized");
}


sampleData()