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

module.exports = { signUp, signIn }
