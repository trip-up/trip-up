const Sequelize = require('sequelize')
const { Role } = require('../../orm')

//add Role 

async function addRole(req, res, next) {

    await Role
        .findOrCreate({
            where: {
                name: req.body.name,
                create: req.body.create,
                read: req.body.read,
                update: req.body.update,
                delete: req.body.delete
            }
        })
        .spread(function (role, created) {
            console.log(role.get({
                plain: true
            }))
            if (created === true) console.log('created', created)
            if (created === false) console.log('Role already exists')
        })
        .catch(next)

}

module.exports = { addRole }
