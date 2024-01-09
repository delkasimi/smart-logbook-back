const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class TicketSolutionRelation extends Model {}

TicketSolutionRelation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ticket_data', // Name of the ticket data table
            key: 'entryId' // Key in the ticket data table to reference
        }
    },
    solution_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'solution_data', // Name of the solution data table
            key: 'solution_id' // Key in the solution data table to reference
        }
    },
    relation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'TicketSolutionRelation',
    tableName: 'ticket_solution_relation',
    timestamps: false // Set true if you want Sequelize to handle createdAt and updatedAt
});

module.exports = TicketSolutionRelation;
