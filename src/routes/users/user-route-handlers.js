const { User } = require('../../orm/index')
const bcrypt = require('bcrypt')
const generateToken = require('../../util/generateToken')

const defaultRole = process.env.DEFAULTROLE

//Sign up 
async function signUp(req, res, next) {
  const newUser = await User
    .findOrCreate({
      where: {
        email: req.body.email,
        name: req.body.name,
        city: req.body.city,
        password: await bcrypt.hash(req.body.password, 5),
        phone: req.body.phone,
        role_id: defaultRole
      }
    })
  const { id, name, email, role_id } = newUser[0].dataValues
  const token = generateToken(id, name, email, role_id)
  res.status(201).json({ token })
}

//Sign In
async function signIn(req, res, next) {
  res.status(200).json({ token: req.token })
}

//Get All Users 
async function getAllUsers(req, res, next) {
  if(req.userToken.role_id !== 1) {
    res.status(403).json('You do not have authorization')
  }
  if(req.userToken.role_id === 1) {
  const allUsers = await User.findAll({})
  res.status(200).json({allUsers})
  .catch(next)
  }
}

module.exports = { signUp, signIn, getAllUsers }
