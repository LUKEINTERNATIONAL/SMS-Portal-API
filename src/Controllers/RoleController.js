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
                error: 'An error has occured trying to retrive a respondent'
            })
        }
    },

    async post(req, res) {
        try {
            const respondent = await Role.create(req.body)
            res.send(respondent)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a respondent'
            })
        }
    },

    async show (req, res) {
        try {
            const respondent = await Role.findByPk(req.params.respondentId)
            res.send(respondent)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a respondent'
            })
        }
    },

    async put (req, res) {
        try {
            const respondent = await Role.update(req.body, {
                where: {
                    id: req.params.respondentId
                }
            })
            res.send(respondent)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the respondent'
            })
        }
    },

    async delete(req, res) {
        try {
           const {respondentId} = req.params
           const respondent = await Role.findByPk(respondentId)
           await respondent.destroy()
           res.send(respondent)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a respondent'
            })
        }
    }
}