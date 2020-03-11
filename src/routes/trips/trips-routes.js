const express = require('express');
const tripsRouter = express.Router();
const ACL = require('../../middleware/accessControlList')
const CREDENTIALS = require('../../../config/serverSettings')

const { createTrip, getAllTrips, getOneTrip, deleteTrip } = require('./trips-routes-handler');

tripsRouter.post('/trips', ACL(CREDENTIALS.USER), createTrip);
//query params for /alltrips should be formatted.
//.*** queries optional***  ? attending=bool   ? coordinating=bool   
tripsRouter.get('/trips', getAllTrips);
tripsRouter.delete('/trips/:trip_id', deleteTrip)

tripsRouter.get('/trips/:trip_id', ACL(CREDENTIALS.ADMIN), getOneTrip);

module.exports = tripsRouter;

