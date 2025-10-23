const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const jobApplicationRoutes = require('./routes/jobApplications');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();


connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/jobs', jobApplicationRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});