/**
 * @requires Sequalize
 * @module "role.schema"
 * @description Export a function that can be called with a sequelize connection obj to instantiate the class Event, which is a Sequelize Model.
 * <br> Add associate() prototype function, which can be called to add table associations. 
 * @param {string} name - name of event
 * @param {string} start_day - start_day of event
 * @param {string} end_day - end_day of event
 * @returns {object} Event
 */
const Sequelize = require('sequelize')

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

  return Event;
}
