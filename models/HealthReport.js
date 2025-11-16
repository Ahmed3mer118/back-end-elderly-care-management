const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Elderly = require('./Elderly');

const HealthReport = sequelize.define('HealthReport', {
  report_id: {
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
  report_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  blood_pressure: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  heart_rate: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sugar_level: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'healthreports',
  timestamps: false
});

// Define relationships
HealthReport.belongsTo(Elderly, { foreignKey: 'elderly_id', as: 'elderly' });
Elderly.hasMany(HealthReport, { foreignKey: 'elderly_id', as: 'healthReports' });

module.exports = HealthReport;

