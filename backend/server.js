const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/colleges', require('./routes/colleges'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/exams', require('./routes/exams'));
app.use('/api/events', require('./routes/events'));
app.use('/api/news', require('./routes/news'));
app.use('/api/counselling', require('./routes/counselling'));
app.use('/api/courses', require('./routes/courses'));

// Base root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Edeco API Gateway',
    version: '1.0.0',
    status: 'active',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      auth: '/api/auth',
      colleges: '/api/colleges',
      cities: '/api/cities',
      exams: '/api/exams',
      events: '/api/events',
      news: '/api/news',
      counselling: '/api/counselling',
      courses: '/api/courses',
      status: '/api/status'
    }
  });
});

// Base status route
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'Edeco API Server is running properly'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
