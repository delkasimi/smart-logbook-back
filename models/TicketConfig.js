// TicketConfig model (if it doesn't exist already)
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const TicketConfig = sequelize.define('TicketConfig', {
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
    tableName: 'ticket_config',
    timestamps: false
  });
  
  module.exports = TicketConfig;
  