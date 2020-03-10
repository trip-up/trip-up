//http post :3000/roles name=test create=true read=true update=true delete=false

const express = require('express')
const roleRouter = express.Router();

const {addRole } = require('./roles-route-handlers')

roleRouter.post('/roles', addRole)

module.exports = roleRouter