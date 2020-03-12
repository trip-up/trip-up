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
        role_id: parseInt(defaultRole)
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
  if(req.user.role_id !== 1) {
    res.status(403).json('You do not have authorization')
  }
  if(req.user.role_id === 1) {
  const allUsers = await User.findAll({})
  res.status(200).json({allUsers})
  .catch(next)
  }
}

//Update User
async function updateUser(req, res, next) {
  const id = parseInt(req.params.id)
  let record = req.body

  console.log('the params', id, req.user.role_id, req.user.id)

  if(req.user.role_id ===1 || req.user.id === id) {
    console.log('inside if')
    await User.update({
      email: record.email,
      name: record.name,
      city: record.city,
      // password: await bcrypt.hash(record.password, 5),
      phone: record.phone,
    }, 
    { where : { id }}
    )
    .then(function (result) {
      res.status(201).json(`${result} record updated`)
    })
      .catch(next)
  } else {
    res.status(403).json('You do not have authorization') 
  }
}

//Delete User
async function deleteUser(req, res, next) {
  const id = parseInt(req.params.id)

  if(req.user.role_id ===1 || req.user.id === id) {
    await User.destroy({
      where: {id}
    })
    .then(function (result) {
      res.status(200).json(`${result} user deleted`)
    })
    .catch(next)
  } else {
    res.status(403).json('You do not have authorization') 
  }
}

module.exports = { signUp, signIn, getAllUsers, updateUser, deleteUser }
