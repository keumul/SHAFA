const {Sequelize} = require('sequelize');

  
  //sequelize.sync();
  module.exports = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
  );