const express = require('express');
const eventRouter = express.Router();

const { addEvent, getOneEvent } = require('./events-route-handlers');

eventRouter.post('/events', addEvent);
eventRouter.get('/events/:id', getOneEvent);
// eventRouter.get('/events/?trip_id=', getAllTripEvents);

module.exports = eventRouter;