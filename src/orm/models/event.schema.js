const Sequelize = require('sequelize')

/**
 * Export a function that can be called with a sequelize connection obj to instantiate the class Event, which is a Sequelize Model.
 * 
 * Add associate() prototype function, which can be called to add table associations. 
 */
module.exports = function (sequelize) {
  class Event extends Sequelize.Model { }

  Event.init({
    name: { type: Sequelize.STRING },
    start_day: { type: Sequelize.DATE },
    end_day: { type: Sequelize.DATE },

  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'event',
  })

  Event.associate = function () {
    Event.belongsTo(sequelize.models.trip, { foreignKey: 'trip_id' })
  }

  return Event

}
