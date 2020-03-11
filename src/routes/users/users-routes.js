const express = require('express')
const authRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic_auth')
const bearerAuth = require('../../middleware/auth/bearer_auth')

const {signUp, signIn, getAllUsers} = require('./user-route-handlers')

authRouter.post('/signup', signUp)
// format request: http :3000/signup name=*** email=**** password=*** city=**** phone****
authRouter.post('/signin', basicAuth, signIn)
//format request: http -a email:password post :3000/signin
authRouter.get('/users', bearerAuth, getAllUsers)
//format request: http get :3000/users 'Authoriation: Bearer TOKEN'


module.exports = authRouter