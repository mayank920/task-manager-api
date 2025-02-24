"use client";
import { useState, useEffect } from "react"
export default function Home() {
  const [tasks, setTasks] = useState<Array<{_id: string; title: string; completed: boolean}>>([]);
  const [newTask, setNewTask] = useState("");
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch(
        "https://task-manager-api-1-5bbh.onrender.com/api/tasks",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ title: newTask }),
        }
      );
      if (!response.ok) throw new Error("Failed to add Task");
      const addedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTask("");
    } catch (error) {
      console.error("Error Adding Task: ", error)
    }
  };

  // update task
  const updateTask = async (id: string, completed: boolean) => {
    try{
    const response = await fetch(`https://task-manager-api-1-5bbh.onrender.com/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
    const data = await response.json();
    console.log("Response Data: ", data);
    if (response.ok) {
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: !completed } : task
        )
      );
    } else {
      console.error("Failed to update task")
    }
    } catch(error){
      console.error("Error updating Task: ", error)
    }
  };

  // Delete Task
  const deleteTask = async (id: string) => {
    const response = await fetch(`https://task-manager-api-1-5bbh.onrender.com/api/tasks/${id}`, { method: "DELETE", });
    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    } else {
      console.error("Failed to delete task");
    }
  };


  useEffect(() => {
    fetch("https://task-manager-api-1-5bbh.onrender.com/api/tasks")
      .then((res) =>{
        console.log("Response status: ", res.status);
        return res.text();
      })
      .then((data) => {
        console.log("Fetched Tasks: ", data);
        return JSON.parse(data);
      })
      .then((jsonData)=>setTasks(jsonData))
      .catch((error) => console.error("Error Fetching tasks: ", error))
  }, []);



  return (<main>
    <h1>Task Manager</h1>
    <p>Welcome to Task Manager App</p>

    {/* to add new task */}
    <input
      type="text"
      placeholder="Enter New Task"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)} />
    <button onClick={handleAddTask}>Add Task</button>
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <li key={index}>
            <span>{task.title}</span>
            <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => updateTask(task._id, task.completed)}
                  className="cursor-pointer" />
            <span className={task.completed ? "line-through text-gray-500" : ""}></span>
            <button onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </li>
        ))
      ) : (
        <p>Loading Tasks...</p>
      )}
    </ul></main>);
}