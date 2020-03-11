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
async function addEvent(req, res, next) {
  await Event.create({
        name: req.body.name,
        start_day: req.body.start_day,
        end_day: req.body.end_day,
        trip_id: req.params.trip_id
  })
  .then(function (event, created) {
    // console.log(event.get({
    //     plain: true
    // }))
    if(created) console.log('created', created)
    res.status(201).json(event)
  })
  .catch(next)
}

/**
 * Get Events from Trip
 * @param {*} req 
 * @param {*} res 
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
 * Update Event
 * @param {*} req 
 * @param {*} res 
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
 * Delete Event
 * @param {*} req 
 * @param {*} res 
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