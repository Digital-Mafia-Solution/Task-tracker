import React from "react";

const Alert = ({ message, type = "error", onClose }) => {
  if (!message) return null;

  return (
    <div className={`custom-alert custom-alert-${type}`}>
      <span>{message}</span>
      <button
        className="custom-alert-close"
        onClick={onClose}
        aria-label="Close alert"
      >
        ×
      </button>
    </div>
  );
};

export default Alert;
