
require('dotenv').config()
const { PORT } = process.env

const { sequelize, Trip, User } = require('./src/orm/index');

sequelize.authenticate()
  .then(() => {
    console.log('connection up!');

    return sequelize.sync();
  })
  .then(() => {
    // Start Express Server
    const server = require('./src/app')
    server.start(PORT);
  })
  .catch(err => {
    console.error(err);
  })
