const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Procedure = require("./procedure");

const Phase = sequelize.define(
  "Phase",
  {
    phase_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    procedure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Procedure",
        key: "procedure_id",
      },
    },
    phase_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attributes: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
  },
  {
    tableName: "phases",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Phase;
