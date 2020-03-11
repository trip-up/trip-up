const { Trip } = require('./../../orm/index')


/**
 * POST /trips with body: name<string>, destination<string>, start<yyyy-mm-dd>, end<yyy-mm-dd>, cost<number>
 * 
 * This function creates one trip and adds it to the DB.  
 */
async function createTrip(req, res, next) {
  //this will mock the request object.. 
  // req.user = {
  //   id: 1,
  //   name: 'tyler',
  //   role_id: 1
  // }

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
 * Get all trips is funny beacuse there are several scenarios we could be talking about here:
 * 
 * 1. A user is trying to get all of the trips they are going on.
 * 2. A user is trying to get all of the trips they are a coordinator for.
 * 4. An admin is trying to see all trips, with all details. 
 * 4B. An admin might want to see a particular level of detail
 */
async function getAllTrips(req, res, next) {
  req.user = {
    name: 'tyler',
    id: 2,
    role_id: 2
  }

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

        //if the admin wants all trips.
        if (Object.keys(req.query).length === 0) {
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
              attributes: [ 'id'] ,
              through: { attributes: [] }
            },
            { association: 'organizer',
              attributes: ['name', 'phone', 'id']    
          }
          ]
        })

        //if the user just wants all trips
        if (Object.keys(req.query).length === 0) {
          //change the members value.
          console.log(allTripsForUsers)
          allTripsForUsers.forEach(trip => {
            trip.dataValues.members = trip.members.length;
            trip.memebers = trip.members.length;
          })

          res.status(200).json({ results: allTripsForUsers, user: req.user })

          //the user wants the trips they are attending
        } else if (req.query.attending) {
          const tripsAttending = allTripsForUsers.filter(trip => trip.members.find(member => memeber.id === userId))
          res.status(200).json({results: tripsAttending})
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
 * getOne trip is also funny for the same reasons. 
 * 
 * We need to give back data based on the user's role and based on whether or not they are the coordinator for the trip in question. 
 * 
 * This route should come in with a trip_id param on the req object, cooresponding to the trip the user wants to access.
 * example request command from httpie: 
 * 
 * http get :3000/trips/2 "authentication: bearer aljshdfas9df9as7fp3mro8y9en3onf3$asfd" (this token is an admin)
 * 
 * gives: 
 * "result": {
        "cost": 2000,
        "createdAt": "2020-03-10T19:46:34.000Z",
        "destination": "olympics",
        "end_day": "1981-08-12T00:00:00.000Z",
        "id": 2,
        "members": [
            {
                "city": "Istambul",
                "createdAt": "2020-03-10T19:46:34.000Z",
                "email": "anopolis59393@pete.com",
                "id": 2,
                "name": "Tyler",
                "phone": "2055503939",
                "picture": "http://picture.com",
                "role_id": 1,
                "updatedAt": "2020-03-10T19:46:34.000Z"
              },  
              ...  etc
              
              * 
              */

async function getOneTrip(req, res, next) {
  //another mock user on the req obj here.
  // req.user = {
  //   id: 68,
  //   name: 'tyler',
  //   role_id: 2
  // }


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
    console.log('user is on trip: ', onTrip);

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
          attributes: ['phone', 'name']
        }
        ],
      }
    }
    //execute the query
    const foundTrip = await Trip.findByPk(id, queryOptions)

    //if the person is not on the trip, only return the length of members.
    if (req.user.role_id === 2 && !onTrip) {
      foundTrip.dataValues.members = foundTrip.members.length;
    }
    console.log(foundTrip.members);

    res.status(200).json({ result: foundTrip })
  } catch (err) {
    next(err);
  }
}


function deleteTrip(req, res, next) {
  try {
    res.status(204).json('Trip Deleted!')
  } catch (err) {
    next(err);
  }
}

module.exports = { createTrip, getAllTrips, getOneTrip, deleteTrip }