const mongoose = require("mongoose");

//Define the task schema (structure of a task)
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    completed: { type: Boolean, defualt: false}
}, { timestamps: true });

//export the model
module.exports = mongoose.model("Task", TaskSchema);