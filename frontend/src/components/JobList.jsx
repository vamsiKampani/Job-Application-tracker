import JobCard from './JobCard';

function JobList({ jobs, onView, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <p>No job applications found. Start by adding your first application!</p>
      </div>
    );
  }

  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onView={() => onView(job)}
          onEdit={() => onEdit(job)}
          onDelete={() => onDelete(job)}
        />
      ))}
    </div>
  );
}

export default JobList;