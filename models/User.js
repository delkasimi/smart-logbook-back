const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    password_last_changed: {
        type: DataTypes.DATE
    },
    password_reset_token: {
        type: DataTypes.STRING
    },
    password_reset_expires: {
        type: DataTypes.DATE
    },
    name: {
        type: DataTypes.STRING
    },
    firstname: {
        type: DataTypes.STRING
    },
    tel: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    department: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
