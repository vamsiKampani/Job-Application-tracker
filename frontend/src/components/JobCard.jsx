import { Calendar, Building2, Edit, Trash2, Eye } from 'lucide-react';

function JobCard({ job, onView, onEdit, onDelete }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
    <div className="job-card">
      <div className="job-card-header">
        <div className="company-info">
          <Building2 size={20} className="icon" />
          <h3>{job.companyName}</h3>
        </div>
        <span 
          className="status-badge" 
          style={{ backgroundColor: getStatusColor(job.status) }}
        >
          {job.status}
        </span>
      </div>

      <div className="job-card-body">
        <p className="job-title">{job.jobTitle}</p>
        <div className="job-date">
          <Calendar size={16} />
          <span>{formatDate(job.applicationDate)}</span>
        </div>
      </div>

      <div className="job-card-actions">
        <button 
          className="action-btn view-btn" 
          onClick={onView}
          title="View Details"
        >
          <Eye size={18} />
          View
        </button>
        <button 
          className="action-btn edit-btn" 
          onClick={onEdit}
          title="Edit"
        >
          <Edit size={18} />
        </button>
        <button 
          className="action-btn delete-btn" 
          onClick={onDelete}
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default JobCard;
