const Sequelize = require('sequelize')
const Role = require('../../orm/index')

/**
 * add Role 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function addRole (req, res, next) {

    await Role.models.role 
        .findOrCreate({where: {
            name: req.body.name,
            create: req.body.create,
            read: req.body.read,
            update: req.body.update,
            delete: req.body.delete}})
        .spread(function(role, created) {
            console.log(role.get({
                plain: true
            }))
            if(created === true) console.log('created', created)
            if(created === false) console.log('Role already exists')
            res.status(201).json(role.role)
        })
        .catch(next)

}

/**
 * get Role
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getRole (req, res, next) {
    await Role.models.role.findAll()
        .then(function(role) {
            res.status(200).json(role)})
        .catch(next)
}


module.exports = {addRole, getRole}
