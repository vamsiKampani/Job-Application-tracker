import { X, Building2, Briefcase, Calendar, Tag, Clock, Edit, Trash2 } from 'lucide-react';

function JobDetails({ job, onClose, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Applied: '#3b82f6',
      Interview: '#f59e0b',
      Offer: '#10b981',
      Rejected: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Application Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="details-content">
          <div className="detail-row">
            <div className="detail-icon">
              <Building2 size={24} />
            </div>
            <div className="detail-info">
              <label>Company Name</label>
              <p className="detail-value">{job.companyName}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon">
              <Briefcase size={24} />
            </div>
            <div className="detail-info">
              <label>Job Title</label>
              <p className="detail-value">{job.jobTitle}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon">
              <Calendar size={24} />
            </div>
            <div className="detail-info">
              <label>Application Date</label>
              <p className="detail-value">{formatDate(job.applicationDate)}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon">
              <Tag size={24} />
            </div>
            <div className="detail-info">
              <label>Status</label>
              <span 
                className="status-badge-large" 
                style={{ backgroundColor: getStatusColor(job.status) }}
              >
                {job.status}
              </span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-icon">
              <Clock size={24} />
            </div>
            <div className="detail-info">
              <label>Last Updated</label>
              <p className="detail-value-small">{formatDateTime(job.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="details-actions">
          <button 
            className="btn btn-secondary" 
            onClick={() => onEdit(job)}
          >
            <Edit size={18} />
            Edit Application
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(job)}
          >
            <Trash2 size={18} />
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
