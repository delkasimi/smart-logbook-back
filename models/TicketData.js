const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const TicketConfig = require('./TicketConfig');
const TicketSolutionRelation = require('./TicketSolutionRelation');

const Ticket = sequelize.define('Ticket', {
    entryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    entry: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    // Add the new conf_id column
    confId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ticket_config', // This is a reference to another model
        key: 'confId', // This is the column name of the referenced model
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    tableName: 'ticket_data',
    timestamps: false
  });
  
    // Define relationships
    Ticket.belongsTo(TicketConfig, { foreignKey: 'confId', as: 'config' });
    TicketConfig.hasMany(Ticket, { foreignKey: 'confId', as: 'tickets' });
    Ticket.hasMany(TicketSolutionRelation, { foreignKey: 'ticket_id', sourceKey: 'entryId' });
    TicketSolutionRelation.belongsTo(Ticket, { foreignKey: 'ticket_id', targetKey: 'entryId' });  
    
  module.exports = Ticket;
  