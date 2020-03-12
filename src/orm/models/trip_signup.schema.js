const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class TripSignup extends Sequelize.Model { }

  TripSignup.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    approval: { type: Sequelize.BOOLEAN, defaultValue: false },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'trip_signup'
  })

  return TripSignup

}