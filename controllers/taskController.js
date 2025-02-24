const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

//Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

// get a task by id
const getTaskById = async (req, res)=>{
    const {id}=req.params
    try{
        const task = await Task.findById(id);
        if (!task){
            return res.status(404).json({error: "Task not found"});
        }
        res.json(task);
    } catch(error){
        res.status(500).json({ error: "Server Error"});
    }
};

//new task
const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({ error: "Title is required" });
        }

        const newTask = new Task({ title });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

//Update a task (mark as completed)
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        task.completed = true;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
};

//Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found!" });

        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
};

// Correctly export functions
module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };