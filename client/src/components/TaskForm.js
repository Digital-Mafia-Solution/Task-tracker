import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      task,
      priority,
      assignedTo,
      date: new Date().toISOString().split("T")[0],
      completed: false,
    };

    onAdd(newTask); // send to App.js
    setTask("");
    setPriority("Medium");
    setAssignedTo("");
  };

  return (
    <div className="task-form">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Task Description</label>
            <input
              className="form-input"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Assigned To</label>
            <input
              className="form-input"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Enter name (optional)"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
