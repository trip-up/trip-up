/**
 * @module "roles-route-handlers"
 * @description Callback functions for Role routes
 */
const { Role } = require('../../orm/index')

/**
 * @function addRole
 * @param {*} req - request body with name, create, read, update, and delete
 * @param {*} res - json of role added
 * @param {*} next 
 * need to reject duplicate roles
 */
async function addRole (req, res, next) {

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
            if(created === true) console.log('created', created)
            if(created === false) console.log('Role already exists')
            res.status(201).json(role.role)
        })
        .catch(next)
}

/**
 * @function getRole
 * @param {*} req 
 * @param {*} res - json of all roles
 * @param {*} next 
 */
async function getRole (req, res, next) {
    await Role.findAll()
        .then(function(role) {
            res.status(200).json(role)})
        .catch(next)
}

/**
 * @function updateRole
 * @param {*} req - request params with id of role to update and request body with fields to edit
 * @param {*} res - results of update
 * @param {*} next 
 */
async function updateRole (req, res, next) {
    await Role.update({
        name: req.body.name,
        create: req.body.create,
        read: req.body.read,
        update: req.body.update,
        delete: req.body.delete,
        },
        {returning: true, where: {id: req.params.id} }
    )
    .then(function (result) {
        console.log('update',result[1])
        res.status(201).json(result)
    })
    .catch(next)
}

/**
 * @function deleteRole
 * @param {*} req - request params with id of role to delete
 * @param {*} res - results of delete
 * @param {*} next 
 */
async function deleteRole (req, res, next) {
    await Role.destroy({
        where: {id: req.params.id}
    })
    .then(function (result) {
        console.log('deleted',result)
        res.status(201).json(result)

    })
    .catch(next)
}

module.exports = {addRole, getRole, updateRole, deleteRole}
