/**
 * @requires Sequalize
 * @module "message.schema"
 * @description Export a function that can be called with a sequelize connection obj to instantiate the class Message, which is a Sequelize Model.
 * <br> Add associate() prototype function, which can be called to add table associations. 
 * @param {string} content - string 1234
 * @returns {object} Message
 */
const Sequelize = require('sequelize')

module.exports = function (sequelize) {

  class Message extends Sequelize.Model { }

  Message.init({
    content: { type: Sequelize.STRING(1234) }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'message',
  });

  return Message

}
