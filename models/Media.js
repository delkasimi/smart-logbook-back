const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Adjust the path as necessary

const Media = sequelize.define(
  "Media",
  {
    media_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    associated_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    associated_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    media_type: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "media",
    timestamps: true,
  }
);

module.exports = Media;
