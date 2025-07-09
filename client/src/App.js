import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import axios from "axios";

const TASKS_API = `https://api.digital-mafia.co.za/task-manager/tasks`; // Will proxy to localhost:5000

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load tasks from backend
  useEffect(() => {
    console.log("Fetching tasks from:", TASKS_API);
    axios
      .get(`${TASKS_API}`)
      .then((res) => {
        console.log("Tasks loaded successfully:", res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
        console.error(
          "Error details:",
          err.response?.data,
          err.response?.status
        );
        setTasks([]);
      });
  }, []);

  // Add task to backend
  const handleAddTask = (task) => {
    axios
      .post(`${TASKS_API}`, task)
      .then((res) => setTasks((prev) => [...prev, res.data]))
      .catch((err) => {
        console.error("Error adding task:", err);
        alert("Failed to add task. Please try again.");
      });
  };

  // Mark task complete
  const handleCompleteTask = (taskId) => {
    axios
      .put(`${TASKS_API}/${taskId}/complete`)
      .then((res) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? res.data : task))
        );
      })
      .catch((err) => {
        console.error("Error completing task:", err);
        alert("Failed to mark task as complete. Please try again.");
      });
  };
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light", !isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("light", !isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <h1 className="app-title">Task Tracker</h1>
          <button
            onClick={toggleTheme}
            className="btn theme-toggle"
            aria-label="Toggle theme"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
        <p className="app-subtitle">
          Organize your work and boost productivity
        </p>
      </header>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onComplete={handleCompleteTask} />
    </div>
  );
}

export default App;
