const express = require("express");
const Task = require("../models/Task");
const {getTasks, getTaskById, createTask, updateTask, deleteTask} = require("../controllers/taskController");

const router = express.Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById)
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
