/**
 * @requires Sequalize
 * @module "events-route-handlers"
 * @description Callback functions for Event routes
 */
const { Event } = require('../../orm/index')

/**
* @function addEvent
* @param {*} req - request params with id of trip to add event to and request body with fields
* @param {*} res - json of event added
* @param {*} next 
*/
async function addEvent(req, res, next) {
  await Event.create({
        name: req.body.name,
        start_day: req.body.start_day,
        end_day: req.body.end_day,
        trip_id: req.params.trip_id
  })
  .then(function (event, created) {
    if(created) console.log('created', created)
    res.status(201).json(event)
  })
  .catch(next)
}

/**
 * @function getEventsFromTrip
 * @description Get Events from Trip
 * @param {*} req - request params with id
 * @param {*} res - json of all events from trip
 * @param {*} next 
 */
async function getEventsFromTrip(req, res, next) {
  console.log('req.body',req.body)
  console.log('req.params',req.params)
  await Event.findAll({
    where: {trip_id: req.params.trip_id}
  })
  .then(function (result) {
    console.log('getEventfromTrip',result)
    res.status(200).json(result)})
  .catch(next)
}

/**
 * @function updateEvent
 * @param {*} req - request params with id of event to update and request body with fields to edit
 * @param {*} res - results of update
 * @param {*} next 
 */
async function updateEvent(req, res, next) {
  await Event.update({
    name: req.body.name,
    start_day: req.body.start_day,
    end_day: req.body.end_day,
    },
    {where: {id: req.params.id}}
  )
  .then(function (result) {
    res.status(201).json(result)
  })
}

/**
 * @function deleteEvent
 * @param {*} req - request params with id of event to delete
 * @param {*} res - results of delete
 * @param {*} next 
 */
async function deleteEvent (req, res, next) {
  await Event.destroy({
    where: {id: req.params.id}
  })
  .then(function (result) {
    res.status(201).json(result)
  })
  .catch(next)
}

module.exports = { addEvent,getEventsFromTrip,updateEvent,deleteEvent };