const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const AssetModel = require('./AssetModel');

const AssetItem = sequelize.define('AssetItem', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    model_id: {
      type: DataTypes.INTEGER,
      references: {
        model: AssetModel,
        key: 'model_id'
      },
      allowNull: false
    },
    item_identifier: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(100)
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
    tableName: 'assetitems',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });

  module.exports = AssetItem;