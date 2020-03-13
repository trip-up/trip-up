/**
 * @requires express
 * @module "trips-route"
 * @description CRUD routes for trips
 * @requires express
 * @requires ACL
 * @requires bearerAuth
 */
const express = require('express');
const tripsRouter = express.Router();
const ACL = require('../../middleware/accessControlList')
const CREDENTIALS = require('../../../config/serverSettings')
const bearerAuth = require('../../middleware/auth/bearer_auth')

const { createTrip, getAllTrips, getOneTrip, deleteTrip, updateTrip } = require('./trips-routes-handler');

/**
 * @name BrowseTrips
 * @function
 * @description Public get trips route
 * @param {callback} getAllTrips
 * @example format commmand line: http :3000/browsetrips
 */
tripsRouter.get('/browsetrips', getAllTrips);

/**
 * @name GetTrips
 * @function
 * @description In App get trips route
 * @param {callback} bearerAuth
 * @param {callback} ACL
 * @param {callback} getAllTrips
 * @example format commmand line: http :3000/trips
 */
tripsRouter.get('/trips', bearerAuth, ACL(CREDENTIALS.USER), getAllTrips);

/**
 * @name CreateTrip
 * @function
 * @param {callback} bearerAuth
 * @param {callback} ACL
 * @param {callback} createTrip
 * @example format commmand line: http post :3000/trips <trip fields>
 */
tripsRouter.post('/trips', bearerAuth, ACL(CREDENTIALS.USER), createTrip);

/**
 * @name UpdateTrip
 * @function
 * @param {callback} bearerAuth
 * @param {callback} ACL
 * @param {callback} updateTrip
 * @example format commmand line: http put :3000/trips/<trip id> <trip fields>
 */
tripsRouter.put('/trips/:trip_id', bearerAuth, ACL(CREDENTIALS.PRIVILEGED), updateTrip)

/**
 * @name DeleteTrip
 * @function
 * @param {callback} bearerAuth
 * @param {callback} ACL
 * @param {callback} deleteTrip
 * @example format commmand line: http delete :3000/trips/<trip id>
 */
tripsRouter.delete('/trips/:trip_id', bearerAuth, ACL(), deleteTrip)

/**
 * @name GetOneTrip
 * @function
 * @param {callback} bearerAuth
 * @param {callback} ACL
 * @param {callback} getOneTrip
 * @example format commmand line: http get :3000/trips/<trip id>
 */
tripsRouter.get('/trips/:trip_id', bearerAuth, ACL(CREDENTIALS.ADMIN), getOneTrip);

module.exports = tripsRouter;

