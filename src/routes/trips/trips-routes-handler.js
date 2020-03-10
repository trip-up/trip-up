function createTrip(req, res, next) {
  try {
    res.status(201).json('Trip Created')
  } catch (err) {
    next(err);
  }
}

function getAllTrips(req, res, next) {
  try {
    res.status(200).json('Listing All Trips')
  } catch (err) {
    next(err);
  }
}



function getOneTrip(req, res, next) {
  try {
    res.status(200).json('Listing One Trip')
  } catch (err) {
    next(err);
  }
}

module.exports = { createTrip, getAllTrips, getOneTrip };