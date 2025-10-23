import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function JobForm({ job, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: 'Applied',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName,
        jobTitle: job.jobTitle,
        applicationDate: job.applicationDate.split('T')[0],
        status: job.status,
      });
    }
  }, [job]);

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.trim().length < 3) {
      newErrors.companyName = 'Company name must be at least 3 characters';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application date is required';
    } else if (new Date(formData.applicationDate) > new Date()) {
      newErrors.applicationDate = 'Application date cannot be in the future';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{job ? 'Edit Application' : 'Add New Application'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={errors.companyName ? 'error' : ''}
              placeholder="e.g., Google"
            />
            {errors.companyName && (
              <span className="error-message">{errors.companyName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title *</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className={errors.jobTitle ? 'error' : ''}
              placeholder="e.g., Software Engineer"
            />
            {errors.jobTitle && (
              <span className="error-message">{errors.jobTitle}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="applicationDate">Application Date *</label>
            <input
              type="date"
              id="applicationDate"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              className={errors.applicationDate ? 'error' : ''}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.applicationDate && (
              <span className="error-message">{errors.applicationDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={errors.status ? 'error' : ''}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {errors.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={submitting}
            >
              {submitting ? 'Saving...' : job ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
