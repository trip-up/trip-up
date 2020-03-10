const express = require('express')
const tripsRouter = express.Router();

const { createTrip } = require('./trips-routes-handler')

tripsRouter.post('/trips', createTrip)


module.exports = tripsRouter