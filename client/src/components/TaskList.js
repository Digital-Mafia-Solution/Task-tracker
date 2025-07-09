import React from "react";

const TaskList = ({ tasks, onComplete }) => {
  const sortPriority = { High: 1, Medium: 2, Low: 3 };

  // Safety check for tasks array
  if (!Array.isArray(tasks)) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <div className="empty-state-text">Loading tasks...</div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">No tasks yet!</div>
          <div className="empty-state-subtext">
            Create your first task above to get started
          </div>
        </div>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort(
    (a, b) => sortPriority[a.priority] - sortPriority[b.priority]
  );

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2 className="task-list-title">Task List</h2>
        <div className="task-count">
          {completedCount}/{tasks.length} completed
        </div>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((t, i) => (
            <tr
              key={t.id || i}
              className={`task-row ${t.completed ? "completed" : ""}`}
            >
              <td>
                <div className="task-date">{t.date}</div>
              </td>
              <td>
                <div className="task-name">{t.task}</div>
              </td>
              <td>
                <span className={`priority-badge ${t.priority.toLowerCase()}`}>
                  {t.priority === "High" && "🔴"}
                  {t.priority === "Medium" && "🟡"}
                  {t.priority === "Low" && "🟢"}
                  {t.priority}
                </span>
              </td>
              <td>
                <div className="task-assignee">{t.assignedTo || "—"}</div>
              </td>
              <td>
                <span
                  className={`status-badge ${
                    t.completed ? "status-completed" : "status-pending"
                  }`}
                >
                  {t.completed ? "✅ Done" : "❌ Pending"}
                </span>
              </td>
              <td>
                {!t.completed && (
                  <button
                    onClick={() => onComplete(t.id)}
                    className="btn btn-success"
                  >
                    ✓ Mark Done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
