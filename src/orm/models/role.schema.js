const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  
  class Role extends Sequelize.Model { }

  Role.init({
    name: { type: Sequelize.STRING, unique: true },
    create: { type: Sequelize.BOOLEAN, defaultValue: false },
    read: { type: Sequelize.BOOLEAN, defaultValue: false },
    update: { type: Sequelize.BOOLEAN, defaultValue: false },
    delete: { type: Sequelize.BOOLEAN, defaultValue: false }
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
