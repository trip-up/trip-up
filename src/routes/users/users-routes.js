/**
 * @requires express
 * @module "users-route"
 * @description CRUD routes for users
 * @requires express
 * @requires basicAuth
 * @requires bearerAuth
 */
const express = require('express')
const authRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic_auth')
const bearerAuth = require('../../middleware/auth/bearer_auth')

const {signUp, signIn, getAllUsers, deleteUser, updateUser} = require('./user-route-handlers')

/**
 * @name signUpUsers
 * @function
 * @param {callback} signUp
 * @example format commmand line: http :3000/signup name=*** email=**** password=*** city=**** phone****
 */
authRouter.post('/signup', signUp)

/**
 * @name signInUsers
 * @function
 * @param {callback} basicAuth
 * @param {callback} signIn
 * @example format commmand line: http -a email:password post :3000/signin
 */
authRouter.post('/signin', basicAuth, signIn)

/**
 * @name GetUsers
 * @function
 * @param {callback} basicAuth
 * @param {callback} getAllUsers
 * @example format commmand line: http get :3000/users 'Authoriation: Bearer TOKEN'
 */
authRouter.get('/users', bearerAuth, getAllUsers)

//format commmand line: http get :3000/users 'Authoriation: Bearer TOKEN'

/**
 * @name UpdateOneUser
 * @function
 * @param {callback} basicAuth
 * @param {callback} updateUser
 * @example format commmand line: http put :3000/users/USERID key:newValue 'Authorizaiton: Bearer TOKEN'
 */
authRouter.put('/users/:id', bearerAuth, updateUser)

/**
 * @name UpdateOneUser
 * @function
 * @param {callback} basicAuth
 * @param {callback} deleteUser
 * @example format commmand line: http delete :3000/users/USERID 'Authorizaiton: Bearer TOKEN'
 */
authRouter.delete('/users/:id', bearerAuth, deleteUser)

module.exports = authRouter