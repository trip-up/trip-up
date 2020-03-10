/**
 * @requires Sequalize
 * @module "roles-route"
 * @description CRUD routes for roles
 */
const express = require('express')
const roleRouter = express.Router();

const {addRole, getRole, updateRole, deleteRole} = require('./roles-route-handlers')

/**
 * http post :3000/roles name=test42 create=true read=true update=true delete=false
 */
roleRouter.post('/roles', addRole)

/**
 * http get :3000/roles
 */
roleRouter.get('/roles', getRole)

/**
 * http put :3000/roles/42 name=test42 create=true read=true update=true delete=false
 */
roleRouter.put('/roles/:id', updateRole)

/**
 * http delete :3000/roles/42
 */
roleRouter.delete('/roles/:id', deleteRole)

module.exports = roleRouter