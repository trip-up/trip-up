const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class TripHasUser extends Sequelize.Model { }

  TripHasUser.init({
    
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'trip_has_user'
  })

  TripHasUser.associate = function () {
    TripHasUser.belongsTo(sequelize.models.user, { foreignKey: 'user_id' })
    TripHasUser.belongsTo(sequelize.models.trip, { foreignKey: 'trip_id' })
  }

  return TripHasUser

}