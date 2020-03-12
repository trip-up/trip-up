/**
 * @requires Sequalize
 * @module "trip_has_user.schema"
 * @description 
 * @param {boolean} approval - is user approved for trip
 * @returns {object} TripHasUSer
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