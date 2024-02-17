const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Adjust the path as necessary

const Localization = sequelize.define(
  "Localization",
  {
    localization_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    x_coordinate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    y_coordinate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    media_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "media",
        key: "media_id",
      },
    },
  },
  {
    tableName: "localizations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Localization;
