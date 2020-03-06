const { sequelize, Model } = require('./models')
const Sequelize = require('sequelize')
const User = require('./user_schema')


class Trip extends Model {}

Trip.init({
  name: { type: Sequelize.STRING },
  destination: { type: Sequelize.STRING },
  start_day: { type: Sequelize.STRING },
  end_day: { type: Sequelize.STRING },
  cost: { type: Sequelize.INTEGER },
  type: { type: Sequelize.STRING },

} , {
  sequelize,
  model_name: 'trip'
})

// Trip.belongsToMany(User, { through: 'trip_has_user' });
// Trip.hasOne(User, { foreignKey: 'coordinator_id' })


module.exports = Trip
