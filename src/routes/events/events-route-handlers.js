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
    console.log('req.body',req.body)
    console.log('req.params',req.params)
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
 * Not working: returns "error": "role is not defined"
 */
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