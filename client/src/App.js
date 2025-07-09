import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";

const TASKS_API = `http://localhost:5000/task-manager/tasks`;
// const TASKS_API = `https://api.digital-mafia.com/task-manager/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend
  useEffect(() => {
    axios
      .get(`${TASKS_API}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add task to backend
  const handleAddTask = (task) => {
    axios
      .post(`${TASKS_API}`, task)
      .then((res) => setTasks((prev) => [...prev, res.data]))
      .catch((err) => console.error(err));
  };

  // Mark task complete
  const handleCompleteTask = (index) => {
    const task = tasks[index];
    axios
      .put(`${TASKS_API}/${task.id}/complete`)
      .then((res) => {
        const updated = [...tasks];
        updated[index] = res.data;
        setTasks(updated);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Tracker</h1>
      <TaskForm onAdd={handleAddTask} />
      <br />
      <TaskList tasks={tasks} onComplete={handleCompleteTask} />
    </div>
  );
}

export default App;
