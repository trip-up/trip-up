const Sequelize = require('sequelize')

/**
 * Export a function that can be called with a sequelize connection obj to instantiate the class Trip, which is a Sequelize Model.
 * 
 * Add associate() prototype function, which can be called to add table associations. 
 */
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
  }

  return Trip;
}
