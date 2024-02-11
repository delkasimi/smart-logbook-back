const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const User = require('./User');

const AuditLog = sequelize.define('AuditLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    details: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'audit_logs',
    timestamps: false
});

module.exports = AuditLog;
