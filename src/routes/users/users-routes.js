const express = require('express')
const authRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic_auth')
const bearerAuth = require('../../middleware/auth/bearer_auth')

const {signUp, signIn, getAllUsers} = require('./user-route-handlers')

authRouter.post('/signup', signUp)
authRouter.post('/signin', basicAuth, signIn)
authRouter.get('/user', bearerAuth, getAllUsers)


module.exports = authRouter