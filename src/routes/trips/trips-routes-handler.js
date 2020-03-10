const { Trip } = require('./../../orm/index')


/**
 * POST /trips with body: name<string>, destination<string>, start<yyyy-mm-dd>, end<yyy-mm-dd>, cost<number>
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function createTrip(req, res, next) {
  //this will mock the request object.. 
  req.user = {
    id: 1,
    name: 'tyler',
    role_id: 1
  }

  try {

    const { name, destination, start, end, cost, type,  } = req.body;
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
 * Get all trips is funny beacuse there are several scenarios we could be talking about here:
 * 
 * 1. A user is trying to get all of the trips they are going on.
 * 2. A user is trying to get all of the trips they are a coordinator for.
 * 3. A user might not have any credentials, and just wants to see some basic information about ALL trips that are going out!
 * 4. An admin is trying to see all trips, with all details. 
 * 4B. An admin might want to see a particular level of detail
 */
async function getAllTrips(req, res, next) {
  try {
    
    res.status(200).json('Listing All Trips')
  } catch (err) {
    next(err);
  }
}

/**
 * getOne trip is also funny for the same reasons. 
 * 
 * We need to give back data based on the user's role and based on whether or not they are the coordinator for the trip in question. 
 * 
 * This route should come in with a trip_id param on the req object, cooresponding to the trip the user wants to access.
 */

async function getOneTrip(req, res, next) {
  console.log('Got here!');
  //another mock user on the req obj here.
  req.user = {
    id: 1,
    name: 'tyler',
    role_id: 1
  }

  try {
    //perform the query regardless.
    const foundTrip = await Trip.findByPk(parseInt(req.params.trip_id), {
      // include: {
      //   association: {
      //     model: 'members',
      //     include: []
      //   }
      // }
    })

    console.log(JSON.parse(JSON.stringify(foundTrip)))
    //if they are an admin
    if (req.user.role_id === 1) {
      res.status(200).json({ result: foundTrip })
    }
    //if they are a user

    //if they are a coordinator


    res.status(200).json('Listing One Trip')
  } catch (err) {
    next(err);
  }
}

module.exports = { createTrip, getAllTrips, getOneTrip };