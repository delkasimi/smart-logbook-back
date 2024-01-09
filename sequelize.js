const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Make sure these match your .env file
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    define: {
      timestamps: true, // Enable timestamps globally
      createdAt: 'created_at', 
      updatedAt: 'updated_at'
    }
  }
);

module.exports = sequelize;
