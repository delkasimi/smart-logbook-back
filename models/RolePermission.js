const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const RolePermission = sequelize.define('RolePermission', {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define role_id as the primary key
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define permission_id as the primary key
        references: {
            model: 'permissions',
            key: 'id'
        }
    }
}, {
    tableName: 'role_permissions',
    timestamps: false
});

module.exports = RolePermission;
