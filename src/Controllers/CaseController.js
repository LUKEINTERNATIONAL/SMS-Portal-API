const {Case} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const { userId} = req.query
            const where = {
                UserId: userId
            }

            const cases = await Case.findAll()
            res.send(cases)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a _case'
            })
        }
    },

    async post(req, res) {
        console.log("body",req.body)
        try {
            const _case = await Case.create(req.body)
            res.send(_case)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a _case'
            })
        }
    },

    async show (req, res) {
        try {
            const _case = await Case.findByPk(req.params.caseId)
            res.send(_case)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a _case'
            })
        }
    }
}