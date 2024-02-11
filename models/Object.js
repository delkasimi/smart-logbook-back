const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Object = sequelize.define(
  "Object",
  {
    object_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    object_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    object_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    attributes: {
      type: DataTypes.JSONB,
    },
  },
  {
    tableName: "objects",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Object;
