/**
 * @requires Sequalize
 * @module "events-route"
 * @description routes for events
 */

const express = require('express')
const eventRouter = express.Router();

const { addEvent, getEventsFromTrip } = require('./events-route-handlers')

eventRouter.post('/events', addEvent)

eventRouter.get('/events/trip/:id', getEventsFromTrip)

module.exports = eventRouter