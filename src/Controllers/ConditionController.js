const {Condition} = require('../models')

module.exports = {

    async index(req, res) {
        try {
            const conditions = await Condition.findAll()
            res.send(conditions)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a condition: '+err
            })
        }
    },

    async show (req, res) {
        try {
            const condition = await Condition.findByPk(req.params.conditionId)
            res.send(condition)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a condition: '+err
            })
        }
    },

    async put (req, res) {
        try {
            let dataObject = req.body
            let { conditionId } = req.body

            const condition = await Condition.update( dataObject, {
                where: {
                    id: conditionId
                }
            })
            
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured tryn to update a condition: '+error
            })
        }
    }
}