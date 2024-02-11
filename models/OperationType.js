const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const OperationType = sequelize.define('OperationType', {
  operation_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'operation_types',
  timestamps: false,
});

module.exports = OperationType;
