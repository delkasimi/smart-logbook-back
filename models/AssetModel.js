const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const AssetModel = sequelize.define('AssetModel', {
  model_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  model_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  attributes: {
    type: DataTypes.JSONB
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  comment: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'assetmodels',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

module.exports = AssetModel;