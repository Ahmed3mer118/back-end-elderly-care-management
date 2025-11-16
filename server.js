const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/database');

// Import routes
const userRoutes = require('./routes/userRoutes');
const elderlyRoutes = require('./routes/elderlyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const healthReportRoutes = require('./routes/healthReportRoutes');
const relativeRoutes = require('./routes/relativeRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/elderly', elderlyRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/health-reports', healthReportRoutes);
app.use('/api/relatives', relativeRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notifications', notificationRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Elderly Care Management System API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      elderly: '/api/elderly',
      appointments: '/api/appointments',
      medications: '/api/medications',
      healthReports: '/api/health-reports',
      relatives: '/api/relatives',
      assignments: '/api/assignments',
      notifications: '/api/notifications'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    console.log('🔄 Attempting to connect to database...');
    await testConnection();
    
    // Sync database models (set force: false in production)
    console.log('🔄 Synchronizing database models...');
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.error('\n💡 Troubleshooting tips:');
    console.error('1. Check if database credentials are correct');
    console.error('2. Verify database host and port are accessible');
    console.error('3. Check firewall settings');
    console.error('4. Ensure database server is running');
    console.error('5. Check if IP address is whitelisted (for remote databases)');
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await sequelize.close();
  process.exit(0);
});

