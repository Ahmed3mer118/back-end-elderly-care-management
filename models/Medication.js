const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Elderly = require('./Elderly');

const Medication = sequelize.define('Medication', {
  medication_id: {
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
  medicine_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  dosage: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  frequency: {
    type: DataTypes.ENUM('once_daily', 'twice_daily', 'thrice_daily', 'four_times_daily', 'as_needed'),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'medications',
  timestamps: false
});

// Define relationships
Medication.belongsTo(Elderly, { foreignKey: 'elderly_id', as: 'elderly' });
Elderly.hasMany(Medication, { foreignKey: 'elderly_id', as: 'medications' });

module.exports = Medication;


