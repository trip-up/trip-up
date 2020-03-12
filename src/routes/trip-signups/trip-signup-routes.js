const express = require('express')
const tripSignupRouter = express.Router();

const { signupForTrip, approveUser, viewPendingSignups } = require('./trip-signup-routes-handlers');

tripSignupRouter.post('/trip-signups', signupForTrip);
tripSignupRouter.put('/trip-signups', approveUser);
tripSignupRouter.get('/trip-signups', viewPendingSignups);

module.exports = tripSignupRouter;