// const User = require('../orm/models/user.schema');
const Sequelize = require('sequelize')
const Schema = require('../../orm/index')
const jwt = require('jsonwebtoken')

let SECRET = process.env(SECRET)

//Sign up 

async function signUp (req, res, next) {

    const newUser = await Schema.models.user
        .findOrCreate({where: {
            email: req.body.email, 
            name: req.body.name,
            city: req.body.city,
            phone: req.body.phone,
            role_id: 2}})
    const {id, name, email} = newUser[0].dataValues
    const token = generateToken(id, name, email)
    res.status(201).json({ token })
}

const generateToken = function(id, name, email) {
  const tokenData = {
    id: this.id,
    email: this.email,

  }
  return jwt.sign(tokenData, SECRET)
}

//Sign in 

// function signIn(req, res, next) {
//     User.models.user

// }


module.exports = {signUp}