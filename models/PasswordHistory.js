const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PasswordHistory = sequelize.define('password_history', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'password_history',
    timestamps: true
});

module.exports = PasswordHistory;