/**
 * @requires Sequelize
 * @module "user.schema"
 * @description Export a function that can be called with a sequelize connection obj to instantiate the class User, which is a Sequelize Model.  
 * <br> Add associate() prototype function, which can be called to add table associations. 
 * @param {string} email email address for user
 * @param {string} name name for user
 * @param {string} city city for user
 * @param {string} phone phone number for user
 * @param {string} picture picture
 * @returns {Object} User
 */
const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  class User extends Sequelize.Model { }

  User.init({
    email: { type: Sequelize.STRING, unique: true },
    name: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    picture: { type: Sequelize.STRING },
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName: true
  });

  return User;
};

