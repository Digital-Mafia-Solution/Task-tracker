import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add task to backend
  const handleAddTask = (task) => {
    axios.post('http://localhost:5000/tasks', task)
      .then(res => setTasks(prev => [...prev, res.data]))
      .catch(err => console.error(err));
  };

  // Mark task complete
  const handleCompleteTask = (index) => {
    const task = tasks[index];
    axios.put(`http://localhost:5000/tasks/${task.id}/complete`)
      .then(res => {
        const updated = [...tasks];
        updated[index] = res.data;
        setTasks(updated);
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Tracker</h1>
      <TaskForm onAdd={handleAddTask} />
      <br />
      <TaskList tasks={tasks} onComplete={handleCompleteTask} />
    </div>
  );
}

export default App;
