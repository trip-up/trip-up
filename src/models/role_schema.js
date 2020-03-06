const { sequelize, Model } = require('./models')
const Sequelize = require('sequelize')


class Role extends Model {}

Role.init({
  name: { type: Sequelize.STRING },
  create: { type: Sequelize.BOOLEAN },
  read: { type: Sequelize.BOOLEAN },
  update: { type: Sequelize.BOOLEAN },
  delete: { type: Sequelize.BOOLEAN }
}, {
  sequelize,
  model_name: 'role'
})


// roles.findAll().then((results) => { 
//   console.log(results.length)
// })

module.exports = Role

