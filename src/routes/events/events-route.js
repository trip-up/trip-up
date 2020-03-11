const express = require('express');
const eventRouter = express.Router();

const { addEvent, getOneEvent, deleteEvent } = require('./events-route-handlers');

eventRouter.post('/events:/trip_id', addEvent);
// update this eventRouter.put(_)
//  delte? eventRouter.get('/events/:event_id', getOneEvent);
eventRouter.delete('/events/:event_id', deleteEvent);
// delete? eventRouter.get('/events/?trip_id=', getAllTripEvents);

module.exports = eventRouter;