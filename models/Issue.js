const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Issue = sequelize.define(
  "Issue",
  {
    issue_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    issue_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "issue_types",
        key: "id",
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "issues",
    timestamps: false,
  }
);

module.exports = Issue;
