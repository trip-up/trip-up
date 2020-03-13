/**
 * @requires express
 * @module "events-route"
 * @description routes for events
 */

const express = require('express')
const eventRouter = express.Router();

const { addEvent, getEventsFromTrip, updateEvent, deleteEvent } = require('./events-route-handlers')

/**
 * @name create/event/for_trip
 * @function
 * @param {callback} addEvent
 * @example http post :3001/events/<id> organizer_user_id=<id> name=<name> start_day=<day> end_day=<day>
 */
eventRouter.post('/events/:trip_id', addEvent)

/**
 * @name get/events/for_trip
 * @function
 * @param {callback} getEventsFromTrip
 * @example http get :3001/events/<id>
 */
eventRouter.get('/events/:trip_id', getEventsFromTrip)

/**
 * 
 * @name update/event
 * @function
 * @param {callback} updateEvent
 * @example http PUT :3000/events/23 organizer_user_id=<organizer_user_id> name=<name-updating-to>
 */
eventRouter.put('/events/:id', updateEvent)

/**
* @name delete/event
 * @function
 * @param {callback} deleteEvent
 * @example http delete :3001/events/17 organizer_user_id=<organizer_user_id>

 */
eventRouter.delete('/events/:event_id', deleteEvent)

module.exports = eventRouter;