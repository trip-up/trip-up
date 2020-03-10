const express = require('express')
const eventRouter = express.Router();

const { addEvent } = require('./events-route-handlers')

eventRouter.post('/events', addEvent)

module.exports = eventRouter