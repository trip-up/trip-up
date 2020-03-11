/**
 * @requires Sequalize
 * @module "events-route"
 * @description routes for events
 */

const express = require('express')
const eventRouter = express.Router();

const { addEvent, getEventsFromTrip, updateEvent, deleteEvent } = require('./events-route-handlers')

/**
 * http post :3001/events/1 name='Go to beach with hank' start_day='2020-1-10' end_day='2020-1-15'
 */
eventRouter.post('/events/:trip_id', addEvent)

/**
 * http get :3001/events/1
 */
eventRouter.get('/events/:trip_id', getEventsFromTrip)

/**
 * http put :3001/events/23 name='Go to beach'
 */
eventRouter.put('/events/:id', updateEvent)

/**
 * http delete :3001/events/17
 */
eventRouter.delete('/events/:id', deleteEvent)

module.exports = eventRouter