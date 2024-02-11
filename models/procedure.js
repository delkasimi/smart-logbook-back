const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const ProcedureType = require("./procedureType");
const Event = require("./Event");
const AssetModel = require("./AssetModel");
const AssetItem = require("./AssetItem");
const Phase = require("./Phase");

const Procedure = sequelize.define(
  "Procedure",
  {
    procedure_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    procedure_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ProcedureType, // Reference the ProcedureType model
        key: "procedure_type_id",
      },
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attributes: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: "id",
      },
      allowNull: false,
    },
    from: {
      type: DataTypes.DATE,
    },
    to: {
      type: DataTypes.DATE,
    },
    asset_model_id: {
      type: DataTypes.INTEGER,
      references: {
        model: AssetModel,
        key: "model_id",
      },
      allowNull: true,
    },
    asset_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: AssetItem,
        key: "item_id",
      },
      allowNull: true,
    },
  },
  {
    tableName: "procedure",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Procedure;
