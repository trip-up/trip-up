/**
 * @requires express
 * @module "trips-route"
 * @description CRUD routes for trips
 * @namespace tripsRouter
 */
const express = require('express');
const tripsRouter = express.Router();
const ACL = require('../../middleware/accessControlList')
const CREDENTIALS = require('../../../config/serverSettings')
const bearerAuth = require('../../middleware/auth/bearer_auth')

const { createTrip, getAllTrips, getOneTrip, deleteTrip, updateTrip } = require('./trips-routes-handler');
/**
 * Public get trips route
 */
tripsRouter.get('/browsetrips', getAllTrips);

/**
 * Bearer and USER credentials required. 
 */
tripsRouter.get('/trips', bearerAuth, ACL(CREDENTIALS.USER), getAllTrips);
tripsRouter.post('/trips', bearerAuth, ACL(CREDENTIALS.USER), createTrip);

/**
 * These routes require bearer auth and ACL.
 */
tripsRouter.put('/trips/:trip_id', bearerAuth, ACL(CREDENTIALS.PRIVILEGED), updateTrip)
tripsRouter.delete('/trips/:trip_id', bearerAuth, ACL(), deleteTrip)

tripsRouter.get('/trips/:trip_id', bearerAuth, ACL(CREDENTIALS.ADMIN), getOneTrip);

module.exports = tripsRouter;

