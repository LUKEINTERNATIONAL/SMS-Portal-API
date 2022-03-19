const {Role} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const { roleId} = req.query
            const where = {
                role_id: roleId
            }

            const respondents = await Role.findAll()
            res.send(respondents)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a role'
            })
        }
    },

    async post(req, res) {
        try {
            const role = await Role.create(req.body)
            res.send(role)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a role'
            })
        }
    },

    async show (req, res) {
        try {
            const role = await Role.findOne({
                where: {
                    role_id: req.params.roleId
                }
              })
            res.send(role)  
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a role'
            })
        }
    },

    async put (req, res) {
        try {
            const role = await Role.update(req.body, {
                where: {
                    id: req.params.roleId
                }
            })
            res.send(role)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the role'
            })
        }
    },

    async delete(req, res) {
        try {
           const {roleId} = req.params
           const role = await Role.findByPk(roleId)
           await role.destroy()
           res.send(role)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a role'
            })
        }
    }
}