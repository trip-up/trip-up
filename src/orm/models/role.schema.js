/**
 * @file "orm/models/role.schema.js"
 * @requires Sequalize
 * @module "role.schema"
 * @param {string} name for role
 * @param {boolean} create - can role create
 * @param {boolean} read - can role read
 * @param {boolean} update - can role update
 * @param {boolean} delete - can role delete
 */

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
