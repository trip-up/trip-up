const express = require('express')
const authRouter = express.Router();
const basicAuth = require('../../middleware/auth/basic_auth')
const bearerAuth = require('../../middleware/auth/bearer_auth')

const {signUp, signIn, getAllUsers, deleteUser, updateUser} = require('./user-route-handlers')

authRouter.post('/signup', signUp)
//format commmand line: http :3000/signup name=*** email=**** password=*** city=**** phone****
authRouter.post('/signin', basicAuth, signIn)
//format commmand line: http -a email:password post :3000/signin
authRouter.get('/users', bearerAuth, getAllUsers)
//format commmand line: http get :3000/users 'Authoriation: Bearer TOKEN'
authRouter.put('/users/:id', bearerAuth, updateUser)
//format commmand line: http put :3000/users/USERID key:newValue 'Authorizaiton: Bearer TOKEN'
authRouter.delete('/users/:id', bearerAuth, deleteUser)
//format commmand line: http delete :3000/users/USERID 'Authorizaiton: Bearer TOKEN'
module.exports = authRouter