const express = require('express')
const authRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic_auth')

const {signUp, signIn} = require('./user-route-handlers')

authRouter.post('/signup', signUp)
authRouter.post('/signin', basicAuth, signIn)
// console.log(basicAuth)


module.exports = authRouter