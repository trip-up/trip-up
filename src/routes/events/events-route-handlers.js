/**
 * @requires Sequalize
 * @module "events-route-handlers"
 * @description Callback functions for Event routes
 */
const { Event } = require('../../orm/')
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

function getEventsFromTrip(req, res, next) {
  await 

}

module.exports = { addEvent,getEventsFromTrip };