const base64 = require('base-64')

function basicAuth(req, res, next ) {
    if(!req.headers.authorization) {
        next(new Error('No Authorization Header Found'))
    }
    const basic = req.headers.authorization.split(' ').pop()
    const decoded = base64.decode(basic) // gives us "user:pass"
    const [email, password] = decoded.split(':') // split on ":"
    return authenticateBasic(email, password)
        .then(results => {
            console.log(results)
            _validate(results)
        })

    function _validate (results) {
    if (results) {
        console.log('validated results', results)
        req.id = results.id
        req.name = results.name
        req.role_id = results.role_id
        req.email = results.email
        tokenData = {
            id: req.id, 
            name: req.name, 
            role_id: req.role_id,
            email: req.email
        }
        next()
    } else {
        next(new Error('you screwed it up'))
    }
    }
}
module.exports = basicAuth 