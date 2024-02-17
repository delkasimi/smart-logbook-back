const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Action = sequelize.define(
  "Action",
  {
    action_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action_reference_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "action_references",
        key: "action_reference_id",
      },
      allowNull: false,
    },
    localization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "localizations",
        key: "localization_id",
      },
    },
    isoptional: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    object_id: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    response_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "response_types",
        key: "response_type_id",
      },
      allowNull: false,
    },
    operation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "operation",
        key: "operation_id",
      },
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "actions",
    timestamps: true,
  }
);

module.exports = Action;
