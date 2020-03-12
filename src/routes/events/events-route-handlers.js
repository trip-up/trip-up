/**
 * @module "events-route-handlers"
 * @description Callback functions for Event routes
 */
const { Event, Trip } = require('../../orm/index')

/**
* @function addEvent
* @param {*} req - request params with id of trip to add event to and request body with fields
* @param {*} res - json of event added
* @param {*} next 
*/

// http post :3001/events/1 organizer_user_id=1 name='Go to beach with hank' start_day='2020-1-10' end_day='2020-1-15'
async function addEvent(req, res, next) {

  const isCoordinator = await Trip.findAll({
    where: {
      organizer_user_id: req.body.organizer_user_id,
      id: req.params.trip_id,
    }

  })

  if (isCoordinator.length > 0) {

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
        if (created) console.log('created', created)
        res.status(201).json(event)
      })
      .catch(next)
  } else {
    res.status(401).json('You do not have the proper permissions to add an event.')
  }
}

/**
 * @function getEventsFromTrip
 * @description Get Events from Trip
 * @param {*} req - request params with id
 * @param {*} res - json of all events from trip
 * @param {*} next 
 */
async function getEventsFromTrip(req, res, next) {
  console.log('req.body', req.body)
  console.log('req.params', req.params)
  await Event.findAll({
    where: { trip_id: req.params.trip_id }
  })
    .then(function (result) {
      console.log('getEventfromTrip', result)
      res.status(200).json(result)
    })
    .catch(next)
}

/**
 * @function updateEvent
 * @param {*} req - request params with id of event to update and request body with fields to edit
 * @param {*} res - results of update
 * @param {*} next 
 */


// http PUT :3000/events/23 organizer_user_id=<organizer_user_id> name=<name-updating-to>
async function updateEvent(req, res, next) {

  // checks that the user at this route is the organizer of the trip at the id in params
  const isCoordinator = await Trip.findAll({
    where: {
      organizer_user_id: req.body.organizer_user_id,
      id: req.params.id,
    }
  })

  if (isCoordinator.length > 0) {
    await Event.update({
      name: req.body.name,
      start_day: req.body.start_day,
      end_day: req.body.end_day,
    },
      { where: { id: req.params.id } }
    )
      .then(function (result) {
        res.status(201).json(result)
      })
  } else {
    res.status(401).json('Access Denied')
  }
}

/**
 * @function deleteEvent
 * @param {*} req - request params with id of event to delete
 * @param {*} res - results of delete
 * @param {*} next 
 */


// http delete :3001/events/17 organizer_user_id=<organizer_user_id> trip_id
async function deleteEvent(req, res, next) {
  console.log('req param id', req.params.id)

  const isCoordinator = await Trip.findAll({
    where: {
      organizer_user_id: req.body.organizer_user_id,
      id: req.body.trip_id
    }
  })

  if (isCoordinator.length > 0) {
    await Event.destroy({
      where: { id: req.params.id }
    })
      .then(function (result) {
        console.log('Event Deleted')
        res.status(204).json(result)
      })
      .catch(next)
  } else {
    res.status(401).json('Access Denied')
  }
}

module.exports = { addEvent, getEventsFromTrip, updateEvent, deleteEvent };