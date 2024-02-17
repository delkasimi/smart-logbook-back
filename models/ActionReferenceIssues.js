const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const ActionReferenceIssues = sequelize.define(
  "ActionReferenceIssues",
  {
    action_reference_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "action_references", // This should match the table name for ActionReference
        key: "action_reference_id",
      },
    },
    issue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "issues", // This should match the table name for Issue
        key: "id",
      },
    },
  },
  {
    tableName: "action_reference_issues",
    timestamps: false,
  }
);

module.exports = ActionReferenceIssues;
