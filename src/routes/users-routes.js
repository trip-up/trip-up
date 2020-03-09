const express = require('express')
const authRouter = express.Router();

const {signUp} = require('./user-route-handlers')

authRouter.post('/signup', signUp)
// authRouter.post('/signin', signIn)

module.exports = authRouter