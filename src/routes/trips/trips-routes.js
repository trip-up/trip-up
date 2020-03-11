const express = require('express');
const tripsRouter = express.Router();

const { createTrip, getAllTrips, getOneTrip, deleteTrip } = require('./trips-routes-handler');

tripsRouter.post('/trips', createTrip);
//query params for /alltrips should be formatted.
//? attending=bool    coordinating=bool   
tripsRouter.get('/trips', getAllTrips);
tripsRouter.delete('/trips/:trip_id', deleteTrip)

tripsRouter.get('/trips/:trip_id', gotHere, getOneTrip);



function gotHere (req, res, next) {
  console.log('got here');
  next();
}

module.exports = tripsRouter;