const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js');
const SolutionConfig = require('./SolutionConfig.js');
const Ticket = require('./TicketData.js');
const TicketSolutionRelation = require('./TicketSolutionRelation');

const Solution = sequelize.define('Solution', {
    solution_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    config_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'solution_configs',
            key: 'config_id'
        }
    },
    ticket_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ticket_data',
            key: 'entryId'
        }
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0 // Default value for views
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0 // Default value for rating count
    },
    usage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0 // Default value for usage count
    },
    average_rating: {
        type: DataTypes.FLOAT, // Use FLOAT for average rating to allow decimal values
        allowNull: true,
        defaultValue: 0.0 // Default value for average rating
    }
}, {
    tableName: 'solution_data',
    timestamps: true
});

Solution.belongsTo(Ticket, { foreignKey: 'ticket_Id' });
Solution.belongsTo(SolutionConfig, { foreignKey: 'config_id' });

Solution.hasMany(TicketSolutionRelation, { foreignKey: 'solution_id', sourceKey: 'solution_id' });
TicketSolutionRelation.belongsTo(Solution, { foreignKey: 'solution_id', targetKey: 'solution_id' });

module.exports = Solution;
