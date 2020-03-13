/**
 * @requires Sequalize
 * @module "trip_has_user.schema"
 * @param {boolean} approval - is user approved for trip
 * @returns {object} TripHasUSer
 */
const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class TripHasUser extends Sequelize.Model { }

  TripHasUser.init({
    // approval: { type: Sequelize.BOOLEAN, defaultValue: false },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'trip_has_user'
  })

  return TripHasUser

}