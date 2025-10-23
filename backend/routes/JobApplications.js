const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');


router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const jobs = await JobApplication.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }
    
    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;
    
 
    if (companyName && companyName.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Company name must be at least 3 characters',
      });
    }
    
    if (applicationDate && new Date(applicationDate) > new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Application date cannot be in the future',
      });
    }
    
    const job = await JobApplication.create({
      companyName,
      jobTitle,
      applicationDate,
      status: status || 'Applied',
    });
    
    res.status(201).json({
      success: true,
      message: 'Job application created successfully',
      data: job,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }
    next(error);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;
    
    
    if (companyName && companyName.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Company name must be at least 3 characters',
      });
    }
    
    if (applicationDate && new Date(applicationDate) > new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Application date cannot be in the future',
      });
    }
    
    let job = await JobApplication.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }
    
    job = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { companyName, jobTitle, applicationDate, status },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Job application updated successfully',
      data: job,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }
    
    await job.deleteOne();
    
    res.json({
      success: true,
      message: 'Job application deleted successfully',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Job application not found',
      });
    }
    next(error);
  }
});

module.exports = router;
