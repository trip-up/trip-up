/**
 * @requires Sequalize
 * @module "roles-route"
 * @description CRUD routes for roles
 */
const express = require('express')
const roleRouter = express.Router();
const ACL = require('../../middleware/accessControlList')
const CREDENTIALS = require('../../../config/serverSettings')

const {addRole, getRole, updateRole, deleteRole} = require('./roles-route-handlers')

/**
 * http post :3000/roles name=test42 create=true read=true update=true delete=false
 */
roleRouter.post('/roles', ACL(CREDENTIALS.ADMIN), addRole)

/**
 * http get :3000/roles
 */
roleRouter.get('/roles', ACL(CREDENTIALS.ADMIN), getRole)

/**
 * http put :3000/roles/42 name=test42 create=true read=true update=true delete=false
 */
roleRouter.put('/roles/:id', ACL(CREDENTIALS.ADMIN), updateRole)

/**
 * http delete :3000/roles/42
 */
roleRouter.delete('/roles/:id', ACL(CREDENTIALS.ADMIN), deleteRole)

module.exports = roleRouter