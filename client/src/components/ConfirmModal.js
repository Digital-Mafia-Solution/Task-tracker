import React from "react";

const ConfirmModal = ({
  open,
  title = "Are you sure?",
  message = "Do you want to proceed?",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-modal-content">
        <h3 className="confirm-modal-title">{title}</h3>
        <div className="confirm-modal-message">{message}</div>
        <div className="confirm-modal-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button className="btn btn-danger" onClick={onConfirm} type="button">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
