const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const ProcedureType = sequelize.define('ProcedureType', {
  procedure_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    tableName: 'proceduretype',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

module.exports = ProcedureType;
