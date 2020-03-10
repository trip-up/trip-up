function addEvent(req, res, next) {
  try {
    res.status(201).json('Event Created')
  } catch (err) {
    next(err);
  }
}

module.exports = { addEvent };