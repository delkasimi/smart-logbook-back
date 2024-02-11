const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const UserRole = sequelize.define('UserRole', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    tableName: 'user_roles',
    timestamps: false
});

module.exports = UserRole;
