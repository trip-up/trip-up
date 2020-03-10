const express = require('express');
const tripsRouter = express.Router();

const { createTrip, getAllTrips, getOneTrip } = require('./trips-routes-handler');

tripsRouter.post('/trips', createTrip);
tripsRouter.get('/trips', getAllTrips);
tripsRouter.get('/trips/trip_id', getOneTrip);


module.exports = tripsRouter;