const {Message} = require('../models')
const { Op } = require("sequelize")

module.exports = {
    async index(req, res) {
        try {
            const { userId} = req.query
            const where = {
                UserId: userId
            }

            const messages = await Message.findAll()
            res.send(messages)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a message'
            })
        }
    },

    async post(req, res) {
        console.log("body",req.body)
        try {
            const message = await Message.create(req.body)
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a message'
            })
        }
    },

    async show (req, res) {
        try {
            const message = await Message.findByPk(req.params.messageId)
            res.send(message)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a message'
            })
        }
    },

    async put (req, res) {
        console.log("hahahaha")
        console.log(req.body)
        console.log(req.params)
  

        try {
            const message = await Message.update(req.body, {
                where: {
                    id: req.params.messageId
                }
            })
            res.send(message)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the message'
            })
        }
    }
}