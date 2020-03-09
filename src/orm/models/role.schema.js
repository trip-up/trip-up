const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  
  class Role extends Sequelize.Model { }

  Role.init({
    name: { type: Sequelize.STRING },
    create: { type: Sequelize.BOOLEAN },
    read: { type: Sequelize.BOOLEAN },
    update: { type: Sequelize.BOOLEAN },
    delete: { type: Sequelize.BOOLEAN }
  }, {
    sequelize: sequelize,
    modelName: 'role',
    freezeTableName: true
  })

  Role.associate = function () {
    console.log("ASSOCIATE!")

    //in here we will do association functions
    // Role.belongsToMany(Sequelize.model.user);
  }

  return Role;
}
