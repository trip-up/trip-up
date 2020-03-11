/**
 * @requires express
 * @module "roles-route"
 * @description CRUD routes for roles
 * @namespace roleRouter
 */
const express = require('express')
const roleRouter = express.Router();
const ACL = require('../../middleware/accessControlList')
const CREDENTIALS = require('../../../config/serverSettings')

const {addRole, getRole, updateRole, deleteRole} = require('./roles-route-handlers')

/**
 * @name create/roles
 * @function
 * @param {callback} addRole
 * @example http post :3000/roles name=test42 create=true read=true update=true delete=false
 */
roleRouter.post('/roles', ACL(CREDENTIALS.ADMIN), addRole)

/**
 * @name get/roles
 * @function
 * @param {callback} getRole
 * @example http get :3000/roles
 */
roleRouter.get('/roles', ACL(CREDENTIALS.ADMIN), getRole)

/**
 * @name put/roles
 * @function
 * @param {callback} updateRole
 * @example http put :3000/roles/42 name=test42 create=true read=true update=true delete=false
 */
roleRouter.put('/roles/:id', ACL(CREDENTIALS.ADMIN), updateRole)

/**
 * @name delete/roles
 * @function
 * @param {callback} deleteRole
 * @example http delete :3000/roles/42
 */
roleRouter.delete('/roles/:id', ACL(CREDENTIALS.ADMIN), deleteRole)

module.exports = roleRouter