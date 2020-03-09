/**
 * @file orm/models/trip.schema.js
 * @requires Sequalize
 * @module "trip.schema"
 * @description Export a function that can be called with a sequelize connection obj to instantiate the class Trip, which is a Sequelize Model.
 * <br>Add associate() prototype function, which can be called to add table associations. 
 * @param {string} name - name for trip
 * @param {string} destination - destination for trio
 * @param {string} start_day - start day for trip
 * @param {string} end_day - end day for trip
 * @param {string} cost - cost for trip
 * @param {string} type - type for trip
 */
const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class Trip extends Sequelize.Model { }

  Trip.init({
    name: { type: Sequelize.STRING },
    destination: { type: Sequelize.STRING },
    start_day: { type: Sequelize.STRING },
    end_day: { type: Sequelize.STRING },
    cost: { type: Sequelize.INTEGER },
    type: { type: Sequelize.STRING },

  }, {
    sequelize,
    modelName: 'trip',
    freezeTableName: true
  })

  Trip.associate = function () {
    Trip.belongsTo(sequelize.models.user, { foreignKey: 'organizer_user_id' })
  }

  return Trip;
}
