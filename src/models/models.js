const Sequelize = require('sequelize')

const Model = Sequelize.Model;
console.log(Model);
const sequelize = new Sequelize('trip_up', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
})

sequelize.authenticate()
  .then(() => console.log('connection up!'))
  .catch(err => console.error(err))
sequelize.sync();



module.exports = {
  sequelize,
  Model
}