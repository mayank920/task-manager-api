const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/Task");

// //Define a simple route
// app.get("/", (req, res)=> {
//     res.send("Hello, Task Manager API!");
// });

// // start the server
// const PORT = 3000;
// app.listen(PORT, ()=>{
//     console.log(`server is running on http://localhost:${PORT}`);
// });

app.use(express.json());  //middleware to pass json data

// mongodb
mongoose.connect("mongodb://localhost:27017/taskmanager",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.error("MongoDB connection error:", err);
});

// //dummy database (temporary)
// let tasks = [];

//  1. Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// 2. Add a new task
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//  3. Update a task (mark as completed)
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = true;
    res.json(task);
});

//  4. Delete a task
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ message: "Task deleted" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
