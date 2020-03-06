require('dotenv').config()
const { PORT } = process.env

// Start Express Server
const server = require('./src/app')
server.start(PORT)