const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Adjust the path as necessary

const Operation = sequelize.define(
  "Operation",
  {
    operation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    procedure_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "procedure",
        key: "procedure_id",
      },
    },
    phase_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "phases",
        key: "phase_id",
      },
    },
    operation_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "operation_types",
        key: "operation_type_id",
      },
    },
    response_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "response_types",
        key: "response_type_id",
      },
    },
    is_response_required: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    localization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "localizations",
        key: "localization_id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    references: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    tableName: "operations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Operation;
