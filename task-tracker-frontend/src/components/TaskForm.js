import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      task,
      priority,
      assignedTo,
      date: new Date().toISOString().split('T')[0],
      completed: false
    };

    onAdd(newTask); // send to App.js
    setTask('');
    setPriority('Medium');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Task"
        required
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        value={assignedTo}
        onChange={e => setAssignedTo(e.target.value)}
        placeholder="Assigned To (optional)"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
