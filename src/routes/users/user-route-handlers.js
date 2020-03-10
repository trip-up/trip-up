// const User = require('../orm/models/user.schema');
// const Sequelize = require('sequelize')
const { User } = require('../../orm');
const jwt = require('jsonwebtoken')

let SECRET = process.env.SECRET

//Sign up 

async function signUp(req, res, next) {
  try {
    const newUser = await User
      .findOrCreate({
        where: {
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          city: req.body.city,
          phone: req.body.phone,
          // role_id: 2
        }
      })

    const { id, name, email } = newUser[0].dataValues
    const token = generateToken(id, name, email)
    res.status(201).json({ token })
  } catch (err) {
    console.log(err.message);
  }
}

const generateToken = function (id, name, email) {
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


module.exports = { signUp }