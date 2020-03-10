/**
 * @requires Sequalize
 * @module "events-route-handlers"
 * @description Callback functions for Event routes
 */
const { Event } = require('../../orm/index')
 /**
  * Add Event
  * @param {*} req 
  * @param {*} res 
  * @param {*} next 
  */
function addEvent(req, res, next) {
  try {
    console.log('addevent',req.body)
    res.status(201).json('Event Created')
  } catch (err) {
    next(err);
  }
}

async function getEventsFromTrip(req, res, next) {
  await Event.findAll({
    where: {trip_id: req.params.trip_id}
  })
  .then(function (result) {
    console.log('getEventfromTrip',result)
    res.status(200).json(role)})
  .catch(next)
}

module.exports = { addEvent,getEventsFromTrip };