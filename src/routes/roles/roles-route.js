

const express = require('express')
const roleRouter = express.Router();

const {addRole, getRole} = require('./roles-route-handlers')

/**
 * http post :3000/roles name=test create=true read=true update=true delete=false
 */
roleRouter.post('/roles', addRole)

/**
 * http get :3000/roles
 */
roleRouter.get('/roles', getRole)

module.exports = roleRouter