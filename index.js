
require('dotenv').config()
const { PORT } = process.env

// Start Express Server
const server = require('./src/app')
server.start(PORT)

require('dotenv').config();
const sequelize = require('./src/orm/index')

sequelize.models.role.findAll()
  .then(results => {
    console.log(results)
  })

