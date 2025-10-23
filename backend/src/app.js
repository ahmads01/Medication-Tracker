// Load environment variables first
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Log environment variables for debugging
console.log('Environment Variables:');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGO_URI: ${process.env.MONGO_URI ? '***' : 'Not set'}`);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

// Import routes
const historyRoutes = require('./routes/historyRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = require('./config/db');

// Connect to database and start server
async function startServer() {
  try {
    // Connect to database
    const dbConnection = await connectDB();
    
    // Only set up routes if database connection is successful
    if (dbConnection) {
      // Routes
      app.use('/api/history', historyRoutes);
      app.use('/api/notifications', notificationRoutes);
      console.log('Routes initialized');
    } else {
      console.warn('Running in limited mode without database connection');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize server:', error);
    return false;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Medication Tracker API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const PORT = process.env.PORT || 5002;

console.log('=== Starting Server ===');
console.log('Environment Variables:');
console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`- PORT: ${PORT}`);
console.log(`- MONGO_URI: ${process.env.MONGO_URI ? '***' : 'Not set'}`);

// Create HTTP server
const http = require('http');
const server = http.createServer(app);

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    console.error('To find and stop the process, run:');
    console.error(`  netstat -ano | findstr :${PORT}`);
    console.error('Then use the PID to stop it:');
    console.error('  taskkill /F /PID <PID>');
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Start the server
async function start() {
  try {
    // Initialize database and routes
    const initialized = await startServer();
    if (!initialized) {
      console.warn('Server started with limited functionality due to initialization errors');
    }

    // Start listening
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      logger.info(`Server is running on port ${PORT}`);
      
      // Initialize cron jobs after server starts
      if (process.env.NODE_ENV !== 'test') {
        try {
          require('./services/scheduler.service').initScheduledJobs();
          console.log('Cron jobs initialized');
        } catch (cronError) {
          console.error('Error initializing cron jobs:', cronError);
          logger.error('Error initializing cron jobs:', cronError);
        }
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
start();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Handle process termination
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

module.exports = { app, server };
