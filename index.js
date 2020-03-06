const server = require('./src/app')
require('dotenv').config()

const { PORT } = process.env

server.start(PORT)