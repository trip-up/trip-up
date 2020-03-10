const Sequelize = require('sequelize')

/**
 * Export a function that can be called with a sequelize connection obj to instantiate the class Message, which is a Sequelize Model.
 * 
 * Add associate() prototype function, which can be called to add table associations. 
 */
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
