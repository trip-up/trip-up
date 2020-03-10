const express = require('express')
const tripSignupRouter = express.Router();

const { signupForTrip } = require('./trip-signup-routes-handlers')

tripSignupRouter.post('/trip-signups', signupForTrip)

module.exports = tripSignupRouter