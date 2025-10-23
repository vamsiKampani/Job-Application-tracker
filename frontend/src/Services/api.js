import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllJobs = async (status = '') => {
  try {
    const url = status ? `/jobs?status=${status}` : '/jobs';
    const response = await api.get(url);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
  }
};

export const getJobById = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch job');
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await api.post('/jobs', jobData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create job');
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update job');
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete job');
  }
};
