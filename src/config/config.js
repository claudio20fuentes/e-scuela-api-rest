const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('e_scuela_bd','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;


