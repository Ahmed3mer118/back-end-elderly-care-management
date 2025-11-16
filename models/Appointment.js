const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Elderly = require('./Elderly');

const Appointment = sequelize.define('Appointment', {
  appointment_id: {
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
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  purpose: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'appointments',
  timestamps: false
});

// Define relationships
Appointment.belongsTo(Elderly, { foreignKey: 'elderly_id', as: 'elderly' });
Elderly.hasMany(Appointment, { foreignKey: 'elderly_id', as: 'appointments' });

module.exports = Appointment;


