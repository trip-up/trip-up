const Sequelize = require('sequelize')

module.exports = function(sequelize) {
  class Trip extends Sequelize.Model { }

  Trip.init({
    name: { type: Sequelize.STRING },
    destination: { type: Sequelize.STRING },
    start_day: { type: Sequelize.STRING },
    end_day: { type: Sequelize.STRING },
    cost: { type: Sequelize.INTEGER },
    type: { type: Sequelize.STRING },

  }, {
    sequelize,
    modelName: 'trip',
    freezeTableName: true
  })

  Trip.associate = function() {
    Trip.belongsToMany(sequelize.models.user, {
      through: sequelize.model.trip_has_user,
      foreignKey: 'trip_id',
      otherKey: 'user_id'
    });
  }

  return Trip;
}

// Trip.belongsToMany(User, { through: 'trip_has_user' });
// Trip.hasOne(User, { foreignKey: 'coordinator_id' })
