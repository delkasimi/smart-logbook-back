const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = require('./User');
const Permission = require('./Permission');


const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Role.belongsToMany(User, { through: 'user_roles' });
Role.belongsToMany(Permission, { through: 'role_permissions' });

module.exports = Role;
