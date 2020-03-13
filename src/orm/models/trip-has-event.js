/**
 * @requires Sequalize
 * @module "trip_has_user.schema"
 * @param {boolean} approval - is user approved for trip
 */
const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class TripHasEvent extends Sequelize.Model { }

  TripHasEvent.init({
    // approval: { type: Sequelize.BOOLEAN, defaultValue: false },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'trip_has_event'
  })

  return TripHasEvent

}