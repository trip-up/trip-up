function addEvent(req, res, next) {
  try {
    res.status(201).json('Event Created')
  } catch (err) {
    next(err);
  }
}


function getOneEvent(req, res, next) {
  try {
    res.status(200).json('Results')
  } catch (err) {
    next(err);
  }
}


module.exports = { addEvent, getOneEvent };