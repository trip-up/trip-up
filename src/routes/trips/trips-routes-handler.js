function createTrip(req, res, next) {
  try {
    res.status(201).json('Trip Created')
  } catch (err) {
    next(err);
  }
}

module.exports = { createTrip };