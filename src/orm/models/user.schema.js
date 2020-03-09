/**
 * @file "orm/models/user.schema.js"
 * @requires Sequalize
 * @module "user.schema"
 */
const Sequelize = require('sequelize')
/**
 * Export a function that can be called with a sequelize connection obj to instantiate the class User, which is a Sequelize Model.
 * 
 * Add associate() prototype function, which can be called to add table associations. 
 */
module.exports = function (sequelize) {
  class User extends Sequelize.Model { }
  /** */
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

  User.associate = function () {
    User.belongsTo(sequelize.model.role, { foreignKey: 'role_id' });
  }

  return User;
}


