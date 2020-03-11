/**
 * @requires Sequalize
 * @module "events-route"
 * @description routes for events
 */

const express = require('express')
const eventRouter = express.Router();

const { addEvent, getEventsFromTrip } = require('./events-route-handlers')

eventRouter.post('/events/:trip_id', addEvent)

eventRouter.get('/events/:trip_id', getEventsFromTrip)

module.exports = eventRouter