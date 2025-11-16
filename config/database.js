const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'reem_earderlycaremanagementsystem',
  process.env.DB_USER || 'reem',
  process.env.DB_PASSWORD || 's8fE5Rai2B#!HTW',
  {
    host: process.env.DB_HOST || 'mysql-reem.alwaysdata.net',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      // إعدادات SSL للاتصال الآمن
      ssl: {
        require: false,
        rejectUnauthorized: false
      },
      // إعدادات إضافية للاتصال البعيد
      connectTimeout: 60000,
      timeout: 60000
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000, // زيادة الوقت للاتصال البعيد
      idle: 10000
    },
    // إعدادات إضافية
    retry: {
      max: 3
    },
    // تعطيل timezone warnings
    timezone: '+00:00'
  }
);

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    console.log(`📊 Connected to: ${sequelize.config.host}:${sequelize.config.port}`);
    console.log(`📊 Database: ${sequelize.config.database}`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    if (error.original) {
      console.error('Original Error:', error.original.message);
      console.error('Error Code:', error.original.code);
    }
    throw error; // إعادة رمي الخطأ لمعرفة المشكلة
  }
};

module.exports = { sequelize, testConnection };
