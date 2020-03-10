// const User = require('../orm/models/user.schema');
const Schema = require('../../orm/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET = process.env.SECRET
const defaultRole = process.env.DEFAULTROLE

//Sign up 
async function signUp (req, res, next) {
  const newUser = await Schema.models.user
        .findOrCreate({where: {
            email: req.body.email,
            name: req.body.name,
            city: req.body.city,
            password: await bcrypt.hash(req.body.password, 5),
            phone: req.body.phone,
            role_id: 2}})
            const {id, name, email, role_id} = newUser[0].dataValues
            const token = generateToken(id, name, email, role_id)
            res.status(201).json({ token })
}

const generateToken = function(id, name, email, role_id) {
  const data = {
    id: id,
    email: email,
    name: name,
    role_id: role_id
  }
  console.log(data)
  return jwt.sign(data, SECRET)
}

//Sign in 

async function signIn (req, res, next) {
  const {id, name, role_id, email} = tokenData
  console.log('token:', id, name, email, role_id)
  let newToken = generateToken(id, name, email, role_id)
  res.status(200).json({newToken})
}

authenticateBasic = async function (email, password) {
  const userFound = await Schema.models.user
  .findOne ({ where: {
      email:  email,}})
////somehwere we need to compare password to hashed password and if true send datavalues to validate 
  return userFound.dataValues
}

///example of how compare password is strucuted 
// const comparePassword = async function (password1, password2) {
//   const validated = await bcrypt.compare(password1, password2)
//       if(validated) {
//         return true
//       } else {
//         return null 
//       }
//       // valid => valid ? this : null
//     // .catch(console.error)
// }



module.exports = {signUp, signIn, authenticateBasic}
