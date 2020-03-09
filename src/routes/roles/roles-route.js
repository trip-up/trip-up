const express = require('express')
const roleRouter = express.Router();

const {addRole } = require('./roles-route-handlers')

roleRouter.post('/roles', addRole)

module.exports = roleRouter