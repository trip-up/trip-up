/**
 * @requires Sequalize
 * @module "trip.schema"
 * @description Export a function that can be called with a sequelize connection obj to instantiate the class Trip, which is a Sequelize Model.
 * <br>Add associate() prototype function, which can be called to add table associations. 
 * @param {string} name - name for trip
 * @param {string} destination - destination for trio
 * @param {*} start_day - start datetime for trip
 * @param {*} end_day - end datetime for trip
 * @param {number} cost - cost for trip
 * @param {string} type - type for trip
 * @returns {Object} Trip
 */
const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class Trip extends Sequelize.Model { }

  Trip.init({
    name: { type: Sequelize.STRING },
    destination: { type: Sequelize.STRING },
    start_day: { type: Sequelize.DATE },
    end_day: { type: Sequelize.DATE },
    cost: { type: Sequelize.INTEGER },
    type: { type: Sequelize.STRING },
    organizer_user_id: { type: Sequelize.INTEGER }

  }, {
    sequelize,
    modelName: 'trip',
    freezeTableName: true
  })

  return Trip;
}
