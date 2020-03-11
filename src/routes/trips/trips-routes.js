const express = require('express');
const tripsRouter = express.Router();

const { createTrip, getAllTrips, getOneTrip, deleteTrip } = require('./trips-routes-handler');

tripsRouter.post('/trips', createTrip);
tripsRouter.get('/trips', getAllTrips);
tripsRouter.get('/trips/:trip_id', getOneTrip);
tripsRouter.delete('/trips/:trip_id', deleteTrip)


module.exports = tripsRouter;