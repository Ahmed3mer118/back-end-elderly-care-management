const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Elderly = require('./Elderly');

const Notification = sequelize.define('Notification', {
  notification_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  elderly_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Elderly,
      key: 'elderly_id'
    }
  },
  type: {
    type: DataTypes.ENUM('alert', 'reminder', 'info', 'warning'),
    allowNull: false,
    defaultValue: 'info'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('read', 'unread'),
    allowNull: false,
    defaultValue: 'unread'
  }
}, {
  tableName: 'notifications',
  timestamps: false
});

// Define relationships
Notification.belongsTo(Elderly, { foreignKey: 'elderly_id', as: 'elderly' });
Elderly.hasMany(Notification, { foreignKey: 'elderly_id', as: 'notifications' });

module.exports = Notification;


