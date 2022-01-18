const {Respondent} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const { userId} = req.query
            const where = {
                UserId: userId
            }

            const respondents = await Respondent.findAll()
            res.send(respondents)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a respondent'
            })
        }
    },

    async post(req, res) {
        try {
            const respondent = await Respondent.create(req.body)
            res.send(respondent)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a respondent'
            })
        }
    },

    async show (req, res) {
        try {
            const respondent = await Respondent.findByPk(req.params.respondentId)
            res.send(respondent)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a respondent'
            })
        }
    },

    async put (req, res) {
        try {
            await Respondent.update(req.body, {
                where: {
                    id: req.params.respondentId
                }
            })
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the respondent'
            })
        }
    }
}