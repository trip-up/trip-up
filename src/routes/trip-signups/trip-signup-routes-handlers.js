/**
 * @module "trip-signup-routes-handlers"
 * @description Callback functions for trip signup
 */
const { TripHasUser } = require('../../orm/index');

/**
 * @function signupForTrip
 * @param {*} req - request body with trip_id
 * @param {*} res
 * @param {*} next 
 * @example http POST :3000/trip-signup trip_id=<trip_id_here>
 */
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

/**
 * @function approveUser
 * @param {*} req 
 * @param {*} res
 * @param {*} next 
 */
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