const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class TripHasUser extends Sequelize.Model { }

  TripHasUser.init({
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'trip_has_user'
  })

  return TripHasUser

}