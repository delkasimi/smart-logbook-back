const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const ProceduresResponse = sequelize.define(
  "ProceduresResponse",
  {
    response_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    procedure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "procedures", // name of the procedures table
        key: "procedure_id",
      },
      onDelete: "CASCADE",
    },
    response: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    modelName: "ProceduresResponse",
    tableName: "procedures_responses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = ProceduresResponse;
