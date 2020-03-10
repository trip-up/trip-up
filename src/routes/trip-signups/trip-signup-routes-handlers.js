

// http POST :3000/trip-signup trip_id=<trip_id_here>
function signupForTrip(req, res, next) {
  try {

    // return trip_id, user_id, approved=false
    res.status(201).json('Trip Created')
  } catch (err) {
    next(err);
  }
}


module.exports = { signupForTrip };