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
  })

  Message.associate = function () {
    Message.belongsTo(sequelize.models.trip, { foreignKey: 'trip_id' })
    Message.belongsTo(sequelize.models.user, { foreignKey: 'sender_user_id' })
    Message.belongsTo(sequelize.models.user, { foreignKey: 'recipient_user_id' })
  }

  return Message

}
