/**
 * @module "trip-signup-routes-handlers"
 * @description Callback functions for trip signup
 */
const { TripSignup, Trip } = require('../../orm/index');

/**
 * @function signupForTrip
 * @param {*} req - request body with trip_id
 * @param {*} res
 * @param {*} next 
 * @example http POST :3000/trip-signups trip_id=<trip_id> user_id=<user_id>
 */
async function signupForTrip(req, res, next) {
  const tripId = parseInt(req.params.id)
  try {
    const approvalPending = await TripSignup.create({
      trip_id: tripId,
      user_id: req.body.user_id,
      approval: false,
    })
  } catch (err) {
    next('already signed up for this trip!');
  }
    // console.log('approval pending', approvalPending)
    res.status(201).json('Trip sign-up pending approval')
}

/**
 * @function viewPendingSignups
 * @param {*} req - organizer user id and trip id
 * @param {*} res - pending signups for trip
 * @param {*} next 
 * @example http GET :3000/trip-signups trip_id=<trip_id> organizer_user_id=<user_id_of_organizer>
 */ 
async function viewPendingSignups(req, res, next) {

  const isCoordinator = await Trip.findAll({
    where: {
      organizer_user_id: req.body.organizer_user_id,
      id: req.body.trip_id,
    }
  })
  if (isCoordinator.length > 0) {
    const findPendingForTrip = await TripSignup.findAll({
      where: {
        trip_id: req.body.trip_id,
        approval: 0
      },
    })

    res.status(200).json(findPendingForTrip);
  } else {
    res.status(401).json('Access Denied')
  }
}

/**
 * @function approveUser
 * @description approval=1 sets to true
 * <br> approval=0 denies signup and deletes user from TripSignup
 * @param {*} req 
 * @param {*} res
 * @param {*} next 
 * @example http PUT :3000/trip-signups organizer_user_id=<user_id_of_organizer> trip_id=<trip_id> user_id=<id_of_user_to_approve> approval=<approval-value-to-set>
 */
async function approveUser(req, res, next) {
  const tripId = parseInt(req.params.id)
  try {
    // checks if coordinator is the organizor attached to the trip_id given
    const isCoordinator = await Trip.findAll({
      where: {
        organizer_user_id: req.body.organizer_user_id,
        id: tripId,
      }
    })

    // if they are, it will return an array with length greater than 0
    if (isCoordinator.length > 0) {
      console.log('in first if')

      // if approval value of true was given, it will update the users approval to true in TripSignup
      if (req.body.approval === 'true') {
        console.log('in set to true')
        await TripSignup.update({
          approval: 1
        }, {
          where: {
            trip_id: tripId,
            user_id: req.body.user_id,
          },
        })

        res.status(201).json('Signup Approved!');
      }
      // if the approval value is not true, it will delete the user from TripSignup
    } else {
      console.log('in set to false')
      await TripSignup.destroy({
        where: {
          trip_id: tripId,
          user_id: req.body.user_id,
        }
      });
      res.status(401).json('User Denied and Removed from Pending')
    }

  } catch (err) {
    console.log('in the catch')
    next(err);
  }
}


module.exports = { signupForTrip, approveUser, viewPendingSignups };
