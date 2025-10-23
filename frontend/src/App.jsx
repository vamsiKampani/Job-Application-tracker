import { useState, useEffect } from 'react';
import Header from './components/Header';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import DeleteConfirmation from './components/DeleteConfirmation';
import SplashScreen from './components/SplashScreen';
import LoginPage from './components/LoginPage'; 
import { getAllJobs, createJob, updateJob, deleteJob } from './services/api';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJob, setDeletingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null); 

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    if (!showSplash && user) fetchJobs();
  }, [statusFilter, showSplash, user]);

 
  const handleLogin = (userData) => {
    setUser(userData);
  };

 
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await getAllJobs(statusFilter);
      setJobs(data);
    } catch (error) {
      showNotification('Failed to fetch jobs', 'error');
    } finally {
      setLoading(false);
    }
  };


  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

 
  const handleCreate = async (jobData) => {
    try {
      await createJob(jobData);
      await fetchJobs();
      setShowForm(false);
      showNotification('Job application created successfully!');
    } catch (error) {
      showNotification(error.message || 'Failed to create job', 'error');
    }
  };

  
  const handleUpdate = async (id, jobData) => {
    try {
      await updateJob(id, jobData);
      await fetchJobs();
      setEditingJob(null);
      setSelectedJob(null);
      showNotification('Job application updated successfully!');
    } catch (error) {
      showNotification(error.message || 'Failed to update job', 'error');
    }
  };


  const handleDelete = async () => {
    try {
      await deleteJob(deletingJob._id);
      await fetchJobs();
      setDeletingJob(null);
      setSelectedJob(null);
      showNotification('Job application deleted successfully!');
    } catch (error) {
      showNotification('Failed to delete job', 'error');
    }
  };

  
  if (showSplash) return <SplashScreen />;

 
  if (!user) return <LoginPage onLogin={handleLogin} />;

  
  return (
    <div className="app">
      <Header />

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="container">
        <div className="header-section">
          <h1>My Job Applications</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(true);
              setEditingJob(null);
            }}
          >
            + Add New Application
          </button>
        </div>

        <div className="filter-section">
          <label>Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Applications</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <JobList
            jobs={jobs}
            onView={setSelectedJob}
            onEdit={(job) => {
              setEditingJob(job);
              setShowForm(true);
            }}
            onDelete={setDeletingJob}
          />
        )}
      </main>

      {showForm && (
        <JobForm
          job={editingJob}
          onSubmit={
            editingJob
              ? (data) => handleUpdate(editingJob._id, data)
              : handleCreate
          }
          onClose={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      )}

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onEdit={(job) => {
            setSelectedJob(null);
            setEditingJob(job);
            setShowForm(true);
          }}
          onDelete={(job) => {
            setSelectedJob(null);
            setDeletingJob(job);
          }}
        />
      )}

      {deletingJob && (
        <DeleteConfirmation
          job={deletingJob}
          onConfirm={handleDelete}
          onCancel={() => setDeletingJob(null)}
        />
      )}
    </div>
  );
}

export default App;
