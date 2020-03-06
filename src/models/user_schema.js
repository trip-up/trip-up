const { sequelize, Model } = require('./models')
const Sequelize = require('sequelize')
const Trip = require('./trip_schema')

class User extends Model {}

User.init({
  email: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  picture: { type: Sequelize.STRING },

}, {
  sequelize,
  modelName: 'user'
});


// User.belongsTo(Trip, { foreign_key: 'trip_id' });

// roles.findAll().then((results) => {
//   console.log(results.length)
// })

module.exports = User

