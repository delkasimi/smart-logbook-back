const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Adjust the path as necessary
const ChecklistConfig = require('./ChecklistConfig');

const ChecklistData = sequelize.define('ChecklistData', {
  entryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entry: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  conf_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'checklist_config',
      key: 'conf_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'checklist_data',
  timestamps: false
});

// Define relationships
ChecklistData.belongsTo(ChecklistConfig, { foreignKey: 'conf_id', as: 'config' });
ChecklistConfig.hasMany(ChecklistData, { foreignKey: 'conf_id', as: 'checklistItems' });

module.exports = ChecklistData;
