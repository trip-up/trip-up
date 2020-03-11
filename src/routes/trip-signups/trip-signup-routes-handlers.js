const { TripHasUser } = require('../../orm/index');


// http POST :3000/trip-signup trip_id=<trip_id_here>
function signupForTrip(req, res, next) {
  try {
    //input user_id, trip_id?

    // return trip_id, user_id, approval=pending
    // add user to TripHasUser with pending approval
    res.status(201).json('Trip sign-up pending approval')
  } catch (err) {
    next(err);
  }
}

function approveUser(req, res, next) {
  try {
    // input trip_id, user_id, approval=pending
    // trip coordinator has ability to flag approval to approved
    // output trip_id, user_id, approval=approved
    // select all from TripHasUser where trip_id === trip organizers trip_ids?
    res.status(200).json('Trip Created')

    // if approved: res.status(200).json('Trip Created')
    // else res.status(401).json ('Approval Denied')
    // can either delete entry from table, or use it to deny that user in the future
  } catch (err) {
    next(err);
  }
}

module.exports = { signupForTrip, approveUser };