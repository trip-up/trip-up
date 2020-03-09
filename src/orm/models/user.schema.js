const Sequelize = require('sequelize')

module.exports = function(sequelize) {
  class User extends Sequelize.Model { }

  User.init({
    email: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    picture: { type: Sequelize.STRING },
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName: true
  });

  User.associate = function() {
    User.belongsTo(sequelize.model.role, { foreignKey: 'role_id'});
  }

  return User;
}




// User.belongsTo(Trip, { foreign_key: 'trip_id' });

// roles.findAll().then((results) => {
//   console.log(results.length)
// })


