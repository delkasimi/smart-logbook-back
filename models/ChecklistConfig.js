const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Adjust the path as necessary

const ChecklistConfig = sequelize.define('ChecklistConfig', {
  confId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  conf: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  tableName: 'checklist_config',
  timestamps: false
});

module.exports = ChecklistConfig;
