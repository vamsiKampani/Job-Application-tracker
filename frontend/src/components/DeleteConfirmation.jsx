import { AlertTriangle } from 'lucide-react';

function DeleteConfirmation({ job, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <AlertTriangle size={48} color="#ef4444" />
        </div>
        
        <h2>Delete Application?</h2>
        <p className="confirm-message">
          Are you sure you want to delete the application for{' '}
          <strong>{job.jobTitle}</strong> at <strong>{job.companyName}</strong>?
        </p>
        <p className="confirm-warning">This action cannot be undone.</p>

        <div className="confirm-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
