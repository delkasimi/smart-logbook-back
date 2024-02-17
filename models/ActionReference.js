const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const ActionReference = sequelize.define(
  "ActionReference",
  {
    action_reference_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "action_types",
        key: "type_id",
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    object_id: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    response_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "response_types",
        key: "response_type_id",
      },
    },
    act_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "act",
        key: "ID",
      },
    },
    localization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "localizations",
        key: "localization_id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    response_label: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "action_references",
    timestamps: true,
  }
);

module.exports = ActionReference;
