const Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.DATABASE_URL);