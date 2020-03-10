/**
 * @requires Sequalize
 * @module "events-route-handlers"
 * @description Callback functions for Event routes
 */

function addEvent(req, res, next) {
  try {
    res.status(201).json('Event Created')
  } catch (err) {
    next(err);
  }
}

module.exports = { addEvent };