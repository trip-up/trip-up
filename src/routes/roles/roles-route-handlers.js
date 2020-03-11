/**
 * @requires Sequalize
 * @module "roles-route-handlers"
 * @description Callback functions for Role routes
 */
const Sequelize = require('sequelize')
const { Role } = require('../../orm/index')

/**
 * add Role 
 * @param {*} req 
 * @param {*} res 
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
 * get Role
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getRole (req, res, next) {
    await Role.findAll()
        .then(function(role) {
            res.status(200).json(role)})
        .catch(next)
}

/**
 * update Role
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * need to work on response .models.role.
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
 * delete Role
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * response
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
