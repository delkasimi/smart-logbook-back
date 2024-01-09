const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Adjust the path as necessary

const SolutionConfig = sequelize.define('SolutionConfig', {
    config_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    conf: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'solution_configs',
    timestamps: false
});

module.exports = SolutionConfig;
