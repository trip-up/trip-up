const express = require('express')
const tripSignupRouter = express.Router();

const { signupForTrip, approveUser } = require('./trip-signup-routes-handlers')

tripSignupRouter.post('/trip-signups/:trip_id', signupForTrip)
tripSignupRouter.put('/trip-signups/:trip_id', approveUser)

module.exports = tripSignupRouter