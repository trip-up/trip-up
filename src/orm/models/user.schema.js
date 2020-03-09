/**
 * @file "orm/models/user.schema.js"
 * @requires Sequelize
 * @module "user.schema"
 * @description Export a function that can be called with a sequelize connection obj to instantiate the class User, which is a Sequelize Model.  
 * <br> Add associate() prototype function, which can be called to add table associations. 
 * DB user schema
 * @param {string} email email address for user
 * @param {string} name name for user
 * @param {string} city city for user
 * @param {string} phone phone number for user
 * @param {string} picture picture
 */
const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class User extends Sequelize.Model { }
  /**

   */
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


