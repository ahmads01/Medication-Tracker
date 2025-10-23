const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/medication-tracker';
  
  console.log('Attempting to connect to MongoDB...');
  console.log(`MongoDB URI: ${mongoURI.replace(/(mongodb:\/\/)[^:]+:([^@]+)@/, '$1***:***@')}`);
  
  try {
    mongoose.connection.on('connecting', () => {
      console.log('MongoDB connecting...');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    const errorMsg = `MongoDB connection failed: ${err.message}`;
    console.error(errorMsg);
    logger.warn(errorMsg);
    logger.warn('Application will continue without database connection');
    // Don't exit the process, let the app run without DB
    return null;
  }
};

module.exports = connectDB;
