const {GroupedConditionForCustomMessage} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const messages = await GroupedConditionForCustomMessage.findAll()
            res.send(messages)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a message'
            })
        }
    },

    async findRelatedCustomMessageID(req, res) {
        try {
            const { customMessageCode} = req.params
            const conditions = await GroupedConditionForCustomMessage.findAll({
                where: {
                    customMessageCode: customMessageCode
                }
            })
            res.send(conditions)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a message'
            })
        }
    },
    async post(req, res) {
        try {
            const message = await GroupedConditionForCustomMessage.create(req.body)
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a message'
            })
        }
    },

    async show (req, res) {
        try {
            const message = await GroupedConditionForCustomMessage.findOne({
                where: {
                    role_id: req.params.roleId
                }
              })
            res.send(message)  
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a message'
            })
        }
    },

    async put (req, res) {
        try {
            const message = await GroupedConditionForCustomMessage.update(req.body, {
                where: {
                    id: req.params.roleId
                }
            })
            res.send(message)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the message'
            })
        }
    },

    async delete(req, res) {
        try {
           const {roleId} = req.params
           const message = await GroupedConditionForCustomMessage.findByPk(roleId)
           await message.destroy()
           res.send(message)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a message: '+err
            })
        }
    },

    async multipleDelete(req, res) {
        const { customMessageCode } = req.params
        try {
            const message = GroupedConditionForCustomMessage.destroy({
                where: {
                    customMessageCode: customMessageCode
                }
            })

            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a message: '+err
            })
        }
    }
}