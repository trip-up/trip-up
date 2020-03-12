const { TripSignup, Trip } = require('../../orm/index');


// http POST :3000/trip-signups trip_id=<trip_id> user_id=<user_id>
async function signupForTrip(req, res, next) {
  try {
    const approvalPending = await TripSignup.create({
      trip_id: req.body.trip_id,
      user_id: req.body.user_id,
      approval: false,
    })
    // console.log('approval pending', approvalPending)
    res.status(201).json('Trip sign-up pending approval')
  } catch (err) {
    next(err);
  }
}


// http GET :3000/trip-signups trip_id=<trip_id> organizer_user_id=<user_id_of_organizer>
async function viewPendingSignups(req, res, next) {

  const isCoordinator = await Trip.findAll({
    where: {
      organizer_user_id: req.body.organizer_user_id,
      id: req.body.trip_id,
    }
  })

  try {
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
  } catch (err) {
    next(err);
  }
}



// http PUT :3000/trip-signups organizer_user_id=<user_id_of_organizer> trip_id=<trip_id> user_id=<id_of_user_to_approve> approval=<approval-value-to-set>
// approval=1 sets to true
// approval=0 denies signup and deletes user from TripSignup

async function approveUser(req, res, next) {
  try {
    // checks if coordinator is the organizor attached to the trip_id given
    const isCoordinator = await Trip.findAll({
      where: {
        organizer_user_id: req.body.organizer_user_id,
        id: req.body.trip_id,
      }
    })

    // if they are, it will return an array with length greater than 0
    if (isCoordinator.length > 0) {
      console.log('in first if')


      // if approval value of true was given, it will update the users approval to true in TripSignup
      if (req.body.approval === '1') {
        console.log('in set to true')
        await TripSignup.update({
          approval: 1
        }, {
          where: {
            trip_id: req.body.trip_id,
            user_id: req.body.user_id,
          },
        })

        res.status(201).json('Signup Approved!');
      }
      // if the approval value is not true, it will delete the user from TripSignup
    }

    if (req.body.approval === '0') {
      console.log('in set to false')
      await TripSignup.destroy({
        where: {
          trip_id: req.body.trip_id,
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



