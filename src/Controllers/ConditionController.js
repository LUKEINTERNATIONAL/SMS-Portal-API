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

    async paginatedIndex(req, res) {
        try {
            let conditions
            let { page, size } = req.params
            page = parseInt(page)
            size = parseInt(size)
            if (size == -1) {
                conditions = await Condition.findAndCountAll()
            } else {
                if( page == -1) {
                    page = 0
                }
                conditions = await Condition.findAndCountAll({
                    limit: parseInt(size),
                    offset: parseInt(page)            
                })
            }
            res.send(conditions)
        } catch (error) {
            res.status(500).send({
                error: "an error occured: "+error
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

            //res(condition)
            
        } catch (error) {
            res.status(500).send({
                error: 'An error has occured tryn to update a condition: '+error
            })
        }
    }
}