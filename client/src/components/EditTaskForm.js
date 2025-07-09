import React, { useState } from "react";
import { SaveIcon, XIcon } from "./Icons";
import AutocompleteInput from "./AutocompleteInput";
import { PEOPLE_LIST } from "../constants/people";

const EditTaskForm = ({ task, onUpdate, onCancel }) => {
  const [taskText, setTaskText] = useState(task.task);
  const [priority, setPriority] = useState(task.priority);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      task: taskText,
      priority,
      assignedTo,
    };

    onUpdate(updatedTask);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Edit Task</h3>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost btn-icon modal-close"
            aria-label="Close modal"
          >
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="edit-form-grid">
              <div className="form-group">
                <label className="form-label">Task Description</label>
                <input
                  className="form-input"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
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
                <AutocompleteInput
                  value={assignedTo}
                  onChange={setAssignedTo}
                  placeholder="Enter name(s)"
                  suggestions={PEOPLE_LIST}
                  className="form-input"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              <XIcon size={16} />
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <SaveIcon size={16} />
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
