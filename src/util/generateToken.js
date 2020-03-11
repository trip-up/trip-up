const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const generateToken = function (id, name, email, role_id) {
  const data = {
    id: id,
    email: email,
    name: name,
    role_id: role_id
  }
  return jwt.sign(data, SECRET)
}

module.exports = generateToken;
