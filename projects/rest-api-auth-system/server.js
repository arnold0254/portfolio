const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/error');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiter to prevent abuse / DDoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});
app.use('/api/', limiter);

// Basic Welcome Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Production REST API & Auth System',
    version: '1.0.0',
    author: 'Arnold Orina Onwong\'a'
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);

// Global Error Handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
