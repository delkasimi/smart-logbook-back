const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const IssueType = sequelize.define(
  "IssueType",
  {
    issue_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "issue_types",
    timestamps: false,
  }
);

module.exports = IssueType;
