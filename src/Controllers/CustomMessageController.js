const {CustomMessage} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const customMessages = await CustomMessage.findAll()
            res.send(customMessages)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a customMessage: '+err
            })
        }
    },

    async post(req, res) {
        console.log(req.body)
        try {
            const customMessage = await CustomMessage.create(req.body)
            res.send(customMessage)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create: '+err
            })
        }
    },

    async show (req, res) {
        try {
            const { customMessageId } = req.params
            const customMessage = await CustomMessage.findOne({
                where: {
                    id: customMessageId
                }
              })
            res.send(customMessage)  
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive: '+error
            })
        }
    },

    async put (req, res) {
        try {
            const { customMessageId } = req.params
            const customMessage = await CustomMessage.update(req.body, {
                where: {
                    id: customMessageId
                }
            })
            res.send(customMessage)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the customMessage'
            })
        }
    },

    async delete(req, res) {
        try {
           const {customMessageId} = req.params
           const customMessage = await CustomMessage.findByPk(customMessageId)
           await customMessage.destroy()
           res.send(customMessage)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a customMessage: '+err
            })
        }
    }
}