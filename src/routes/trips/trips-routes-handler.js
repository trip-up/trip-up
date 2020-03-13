/**
 * @module "trips-route-handler"
 * @description Callback functions for Trip routes
 */
const { Trip } = require('./../../orm/index')
const { ERRORS } = require('./../../../config/serverSettings')

/**
 * @function createTrip
 * @description This function creates one trip and adds it to the DB. 
 * @param {*} req - request body with fields for trip
 * @param {*} res
 * @param {*} next 
 * @example POST /trips with body: name<string>, destination<string>, start<yyyy-mm-dd>, end<yyy-mm-dd>, cost<number>
 */
async function createTrip(req, res, next) {
  try {

    const { name, destination, start, end, cost, type, } = req.body;
    const newTrip = await Trip.create({
      name,
      destination,
      start_day: start,
      end_day: end,
      cost,
      type,
      organizer_user_id: req.user.id
    })
    res.status(201).json({ trip_created: newTrip })

  } catch (err) {
    next(err);
  }
}

/**
 * @function getAllTrips
 * @description Get all trips is funny beacuse there are several scenarios we could be talking about here:
 * <br> 1. A user is trying to get all of the trips they are going on.
 * <br> 2. A user is trying to get all of the trips they are a coordinator for.
 * <br> 4. An admin is trying to see all trips, with all details. 
 * <br> 4B. An admin might want to see a particular level of detail
 * @param {*} req
 * @param {*} res
 * @param {*} next 
 */
async function getAllTrips(req, res, next) {
  // if not a member
  if (!req.user) {
    const allTripsForAnonymous = await Trip.findAll({
      include:
      {
        association: 'members',
        attributes: ['id']
      },
      attributes: ['name', 'start_day', 'end_day']
    })
    console.log(allTripsForAnonymous);
    allTripsForAnonymous.forEach(trip => {
      trip.dataValues.members = trip.members.length
      trip.memebers = trip.members.length
    })
    res.status(200).json({ results: allTripsForAnonymous })
  } else {
    // if a user
    const userId = req.user.id;

    try {

      //an admin is trying to get all trips with all users. 
      if (req.user.role_id === 1) {
        const allTrips = await Trip.findAll({
          include: [
            {
              association: 'members',
              attributes: { exclude: ['password'] },
              through: { attributes: [] }
            },
            {
              association: 'organizer',
              attributes: { exclude: ['password'] }
            }
          ]
        })
        //trips
        //trips?coordinating=true
        //trips?attending=true

        //if the admin wants all trips.
        if (!req.query.coordinating && !req.query.attending) {
          res.status(200).json({ results: allTrips });

          //if the admin only wants trips they are coordinating
        } else if (req.query.coordinating) {
          const tripsCoordinating = allTrips.filter(trip => {
            trip.organizer === userId;
          })
          res.status(200).json({ results: tripsCoordinating });

          //if the admin only wants the trips they are attending. 
        } else if (req.query.attending) {
          const tripsAttending = allTrips.filter(trip => {
            !!trip.members.find(member => memeber.id === userId);
          })
        }

        //they are a user.
      } else if (req.user.role_id === 2) {
        const allTripsForUsers = await Trip.findAll({
          include: [
            {
              association: 'members',
              attributes: ['id'],
              through: { attributes: [] }
            },
            {
              association: 'organizer',
              attributes: ['name', 'phone', 'id']
            }
          ]
        })

        //if the user just wants all trips
        if (!req.query.coordinating && !req.query.attending) {
          //change the members value.
          // console.log(allTripsForUsers)
          allTripsForUsers.forEach(trip => {
            trip.dataValues.members = trip.members.length;
            trip.memebers = trip.members.length;
          })

          res.status(200).json({ results: allTripsForUsers, user: req.user })

          //the user wants the trips they are attending
        } else if (req.query.attending) {
          const tripsAttending = allTripsForUsers.filter(trip => trip.members.find(member => memeber.id === userId))
          res.status(200).json({ results: tripsAttending })
          //the user wants the trips they are coordinating
        } else if (req.query.coordinating) {
          const tripsCoordinating = allTripsForUsers.filter(trip => trip.organizer.id === userId)
        }

      }

    } catch (err) {
      next(err);
    }
  }
}

/**
 * @function getOneTrip
 * @description getOne trip is also funny for the same reasons.
 * <br> We need to give back data based on the user's role and based on whether or not they are the coordinator for the trip in question.
 * <br> This route should come in with a trip_id param on the req object, cooresponding to the trip the user wants to access.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @example http get :3000/trips/2 "authentication: bearer aljshdfas9df9as7fp3mro8y9en3onf3$asfd" (this token is an admin)
 */
async function getOneTrip(req, res, next) {
  try {
    //find the trip were talking about, so we can figure out if this person in on the trip.
    const id = parseInt(req.params.trip_id);
    let queryOptions = {
      include: [{
        association: 'members',
        through: { attributes: [] },
        attributes: ['id']
      },
      {
        association: 'organizer',
        attributes: ['phone', 'name']
      }]
    };

    const checkTrip = await Trip.findByPk(id, queryOptions)
    const onTrip = !!checkTrip.members.find(member => member.id === req.user.id)
    // console.log('user is on trip: ', onTrip);

    //if they are an admin or the coordinator of the trip
    if (req.user.role_id === 1 || (req.user.role_id === 2 && checkTrip.dataValues.organizer_user_id === req.user.id)) {
      queryOptions = {
        include: [{
          association: 'members',
          through: { attributes: [] },
          attributes: ['id']
        },
        {
          association: 'organizer',
          attributes: ['phone', 'name']
        },
        {
          association: 'events',
          attributes: ['name', 'start_day', 'end_day'],
          through: { attributes: [] }
        }]
      };

      const checkTrip = await Trip.findByPk(id, queryOptions)

      const onTrip = !!checkTrip.members.find(member => member.id === req.user.id)
      console.log(onTrip);

      //if they are an admin or the coordinator of the trip
      if (req.user.role_id === 1 || (req.user.role_id === 2 && checkTrip.dataValues.organizer_user_id === req.user.id)) {
        queryOptions = {
          include: [{
            association: 'members',
            attributes: { exclude: ['password'] },
            through: { attributes: [] }
          },
          {
            association: 'organizer',
            attributes: ['phone', 'name']
          }]
        }
      }

    }
    //if they are a member of the trip
    if (req.user.role_id === 2 && onTrip) {
      queryOptions = {
        include: [{
          association: 'members',
          attributes: ['name', 'phone', 'email', 'city', 'picture'],
          through: { attributes: [] }
        },
        {
          association: 'organizer',
          attributes: ['phone', 'name', 'email', 'city', 'picture']
        },
        {
          association: 'event',
          attributes: ['name', 'start_day', 'end_day'],
          through: { attributes: [] }
        }]
      }
    }

    //execute the query
    const foundTrip = await Trip.findByPk(id, queryOptions)

    //query trip events

    //if the person is not on the trip, only return the length of members.
    if (req.user.role_id === 2 && !onTrip) {
      foundTrip.dataValues.members = foundTrip.members.length;
    }
    // console.log(foundTrip.members);

    res.status(200).json({ result: foundTrip })

  } catch (err) {
    next(err);
  }
}

/**
 * @function deleteTrip
 * @param {*} req - params with trip id
 * @param {*} res 
 * @param {*} next 
 */
async function deleteTrip(req, res, next) {

  try {
    await Trip.destroy({
      where: { id: req.params.trip_id }
    })
    res.status(204).json({ result: 'deleted the resource!' })
  } catch (err) {
    console.error(err.message)
    next(ERRORS.delete)
  }
}

/**
 * @function updateTrip
 * @param {*} req - request paramas of id of trip and body with fields to update
 * @param {*} res 
 * @param {*} next 
 */
async function updateTrip(req, res, next) {
  try {
    // admin or is coordinator
    await Trip.update(
      {
        name: req.body.name,
        destination: req.body.destination,
        start_day: req.body.start_day,
        end_day: req.body.end_day,
        cost: req.body.cost,
        type: req.body.type,
      },
      { where: { id: req.params.id } }
    )
  } catch (err) {
    console.error(err.message)
    throw new Error(ERRORS.update)
  }
}
module.exports = { createTrip, getAllTrips, getOneTrip, deleteTrip, updateTrip }