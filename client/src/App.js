import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTaskForm from "./components/EditTaskForm";
import { SunIcon, MoonIcon } from "./components/Icons";
import axios from "axios";

const TASKS_API = `https://api.digital-mafia.co.za/task-manager/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

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

  // Delete task
  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios
        .delete(`${TASKS_API}/${taskId}`)
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
          );
        })
        .catch((err) => {
          console.error("Error deleting task:", err);
          alert("Failed to delete task. Please try again.");
        });
    }
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Update task
  const handleUpdateTask = (updatedTask) => {
    console.log("Updating task:", updatedTask);
    console.log("API URL:", `${TASKS_API}/${updatedTask.id}`);

    axios
      .put(`${TASKS_API}/${updatedTask.id}`, updatedTask)
      .then((res) => {
        console.log("Update successful:", res.data);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? res.data : task
          )
        );
        setEditingTask(null);
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        alert("Failed to update task. Please try again.");
      });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
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
            className="btn theme-toggle btn-icon"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
        <p className="app-subtitle">
          Organize your work and boost productivity
        </p>
      </header>
      <TaskForm onAdd={handleAddTask} />
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onUpdate={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default App;
