const base64 = require('base-64')
const { User } = require('../../orm/index')
const bcrypt = require('bcrypt')
const generateToken = require('../../util/generateToken')

function basicAuth(req, res, next) {
    if (!req.headers.authorization) {
        next(new Error('No Authorization Header Found'))
    }
    const basic = req.headers.authorization.split(' ').pop()
    const decoded = base64.decode(basic) // gives us "user:pass"
    const [email, password] = decoded.split(':') // split on ":"
    authenticateBasic(email, password)
        .then(userInfo => {
            if (!userInfo) next('bad credentials sucka')
            // _validate(userInfo)
            const { name, email, role_id, id } = userInfo
            req.user = { id, name, role_id, email }
            req.token = generateToken(id, name, email, role_id);
            next()
        })
}

async function authenticateBasic(email, password) {
    const userFound = await User.findOne({
        where: { email: email }
    })
    const correctPassword = await bcrypt.compare(password, userFound.password)
    return correctPassword ? userFound.dataValues : false;
}

module.exports = basicAuth 