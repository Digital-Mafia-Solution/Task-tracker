import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTaskForm from "./components/EditTaskForm";
import { SunIcon, MoonIcon } from "./components/Icons";
import axios from "axios";
import Alert from "./components/Alert";
import ConfirmModal from "./components/ConfirmModal";

const TASKS_API = `https://api.digital-mafia.co.za/task-manager/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "danger" });
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    taskId: null,
  });

  const showAlert = (message, type = "danger", duration = 5000) => {
    setAlert({ message, type });
    if (duration > 0) {
      setTimeout(() => setAlert({ message: "", type }), duration);
    }
  };

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
        showAlert("Failed to load tasks. Please try again.", "danger");
      });
  }, []);

  // Add task to backend
  const handleAddTask = (task) => {
    const payload = {
      ...task,
      assignedTo: Array.isArray(task.assignedTo)
        ? task.assignedTo.join(";")
        : task.assignedTo,
    };
    axios
      .post(`${TASKS_API}`, payload)
      .then((res) => {
        setTasks((prev) => [...prev, res.data]);
        showAlert("Task added successfully!", "success");
      })
      .catch((err) => {
        console.error("Error adding task:", err);
        showAlert("Failed to add task. Please try again.", "danger");
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
        showAlert("Task marked as completed!", "success");
      })
      .catch((err) => {
        console.error("Error completing task:", err);
        showAlert(
          "Failed to mark task as complete. Please try again.",
          "danger"
        );
      });
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setConfirmDelete({ open: true, taskId });
  };

  const handleConfirmDelete = () => {
    const taskId = confirmDelete.taskId;
    setConfirmDelete({ open: false, taskId: null });
    axios
      .delete(`${TASKS_API}/${taskId}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        showAlert("Task deleted successfully!", "success");
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        showAlert("Failed to delete task. Please try again.", "danger");
      });
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ open: false, taskId: null });
  };

  // Edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Update task
  const handleUpdateTask = (updatedTask) => {
    const payload = {
      ...updatedTask,
      assignedTo: Array.isArray(updatedTask.assignedTo)
        ? updatedTask.assignedTo.join(";")
        : updatedTask.assignedTo,
    };
    console.log("Updating task:", payload);
    console.log("API URL:", `${TASKS_API}/${payload.id}`);

    axios
      .put(`${TASKS_API}/${payload.id}`, payload)
      .then((res) => {
        console.log("Update successful:", res.data);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === payload.id ? res.data : task))
        );
        setEditingTask(null);
        showAlert("Task updated successfully!", "success");
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        showAlert("Failed to update task. Please try again.", "danger");
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
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: alert.type })}
      />
      <header className="app-header">
        <div className="header-top">
          <h1 className="app-title">Task Manager</h1>
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
      <ConfirmModal
        open={confirmDelete.open}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default App;
