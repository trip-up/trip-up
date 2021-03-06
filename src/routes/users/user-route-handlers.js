/**
 * @module "user-route-handlers"
 * @description Callback functions for User routes
 */
const { User } = require('../../orm/index')
const bcrypt = require('bcrypt')
const generateToken = require('../../util/generateToken')
const { CREDENTIALS } = require('../../../config/serverSettings')

const defaultRole = process.env.DEFAULTROLE

/**
 * @function signUp
 * @param {*} req - request body with user info
 * @param {*} res - user token
 * @param {*} next 
 */
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
  res.status(201).json({ id, token })
}

/**
 * @function signIn
 * @param {*} req 
 * @param {*} res - user Token
 * @param {*} next 
 */
async function signIn(req, res, next) {
  res.status(200).json({ id: req.user.id , token: req.token})
}

/**
 * @function getAllUsers
 * @param {*} req - request with user role
 * @param {*} res 
 * @param {*} next 
 */
async function getAllUsers(req, res, next) {
  if (req.user.role_id !== CREDENTIALS.ADMIN) {
    res.status(403).json('You do not have authorization')
  }
  if (req.user.role_id === CREDENTIALS.ADMIN) {
    const allUsers = await User.findAll({})
    res.status(200).json({ allUsers })
  }
  next()
}

//Get One User
async function getOneUser(req, res, next) {
  const id = parseInt(req.params.id)
  if (req.user.role_id !== CREDENTIALS.ADMIN) {
    res.status(403).json('You do not have authorization')
  }
  if (req.user.role_id === CREDENTIALS.ADMIN) {
    const userInfo = await User.findOne({
      where: { id }
    })
    res.status(200).json({ userInfo })
  }
  next()
}

/**
 * @function updateUser
 * @param {*} req - request params of user and body with info
 * @param {*} res 
 * @param {*} next 
 */
async function updateUser(req, res, next) {
  const id = parseInt(req.params.id)
  let record = req.body

  if (req.user.role_id === CREDENTIALS.ADMIN || req.user.id === id) {
    await User.update({
      email: record.email,
      name: record.name,
      city: record.city,
      // password: await bcrypt.hash(record.password, 5),
      phone: record.phone,
    },
      { where: { id } }
    )
      .then(function (result) {
        res.status(200).json(`${result} record updated`)
      })
      .catch(next)
  } else {
    res.status(403).json('You do not have authorization')
  }
}

/**
 * @function deleteUser
 * @param {*} req - request params with id of user
 * @param {*} res 
 * @param {*} next 
 */
async function deleteUser(req, res, next) {
  const id = parseInt(req.params.id)

  if (req.user.role_id === CREDENTIALS.ADMIN || req.user.id === id) {
    await User.destroy({
      where: { id }
    })
      .then(function (result) {
        res.status(200).json(`${result} user deleted`)
      })
      .catch(next)
  } else {
    res.status(403).json('You do not have authorization')
  }
}

module.exports = { signUp, signIn, getAllUsers, updateUser, deleteUser, getOneUser }
