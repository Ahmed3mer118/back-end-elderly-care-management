const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Elderly = sequelize.define('Elderly', {
  elderly_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  health_condition: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  blood_type: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: true
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  emergency_contact: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  users_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  }
}, {
  tableName: 'elderly',
  timestamps: false
});

// Define relationships
Elderly.belongsTo(User, { foreignKey: 'users_user_id', as: 'user' });
User.hasOne(Elderly, { foreignKey: 'users_user_id', as: 'elderly' });

module.exports = Elderly;


