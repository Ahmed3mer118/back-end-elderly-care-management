const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Elderly = require('./Elderly');

const Relative = sequelize.define('Relative', {
  relative_id: {
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
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  relation: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'relatives',
  timestamps: false
});

// Define relationships
Relative.belongsTo(Elderly, { foreignKey: 'elderly_id', as: 'elderly' });
Elderly.hasMany(Relative, { foreignKey: 'elderly_id', as: 'relatives' });

module.exports = Relative;


