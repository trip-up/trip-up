/**
 * @requires express
 * @module "trip-signup-routes"
 * @description routes for trip signup
 * @namespace tripSignupRouter
 */
const express = require('express')
const tripSignupRouter = express.Router();

const { signupForTrip, approveUser, viewPendingSignups } = require('./trip-signup-routes-handlers');

tripSignupRouter.get('/trip-signups', viewPendingSignups);
/**
 * @name create/trip-signups/for_trip
 * @function
 * @param {callback} signupForTrip
 * @example http POST :3000/trip-signup trip_id=<trip_id_here>
 */
tripSignupRouter.post('/trip-signups/:id', signupForTrip)

/**
 * @name approve/trip-signups/for_trip
 * @function
 * @param {callback} approveUser
 */
tripSignupRouter.put('/trip-signups/:id', approveUser)

module.exports = tripSignupRouter;