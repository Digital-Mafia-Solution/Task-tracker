import React from 'react';

const TaskList = ({ tasks, onComplete }) => {
  const sortPriority = { High: 1, Medium: 2, Low: 3 };

  const sortedTasks = [...tasks].sort(
    (a, b) => sortPriority[a.priority] - sortPriority[b.priority]
  );

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Date</th>
          <th>Task</th>
          <th>Priority</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Done?</th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.map((t, i) => (
          <tr key={i}>
            <td>{t.date}</td>
            <td>{t.task}</td>
            <td>{t.priority}</td>
            <td>{t.assignedTo || '—'}</td>
            <td>{t.completed ? '✅ Done' : '❌ Pending'}</td>
            <td>
              {!t.completed && (
                <button onClick={() => onComplete(i)}>Mark Done</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
