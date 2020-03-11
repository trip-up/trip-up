/**
 * @requires Sequalize
 * @module "role.schema"
 * @param {string} name name of role
 * @param {boolean} create - can role create
 * @param {boolean} read - can role read
 * @param {boolean} update - can role update
 * @param {boolean} delete - can role delete
 * @returns {object} Role
 */

const Sequelize = require('sequelize');

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

  return Role;
};
