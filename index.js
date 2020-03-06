
require('dotenv').config()
const { PORT } = process.env

// Start Express Server
const server = require('./src/app')
server.start(PORT)

require('dotenv').config();
const roles = require('./src/models/role_schema')
const trips = require('./src/models/trip_schema')

