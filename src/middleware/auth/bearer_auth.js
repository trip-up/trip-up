/**
 * @module bearer_auth
 */
const jwt = require('jsonwebtoken')

const SECRET= process.env.SECRET

function bearerAuth (req, res, next) {
//   check if we have an authorization header
  if (!req.headers.authorization) {
    next('No authorization header, no token')
  }
  // if we have an authorization header it'll look like this:
  // "Bearer ufewinvwiubfknoernboernberonbkuwrnbvsfdlv"
  const token = req.headers.authorization.split(' ').pop()

  req.user = jwt.verify(token, SECRET)
  next()
}

module.exports = bearerAuth