const {User} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const { userId} = req.query
            const where = {
                UserId: userId
            }

            const users = await User.findAll()
            res.send(users)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a user'
            })
        }
    },

    async post(req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a user'
            })
        }
    },

    async show (req, res) {
        try {
            const user = await User.findByPk(req.params.userId)
            res.send(user)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a user'
            })
        }
    },

    async put (req, res) {
        try {
            const user = await User.update(req.body, {
                where: {
                    id: req.params.respondentId
                }
            })
            res.send(user)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the user'
            })
        }
    },

    async delete(req, res) {
        try {
           const {respondentId} = req.params
           const user = await User.findByPk(respondentId)
           await user.destroy()
           res.send(user)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a user'
            })
        }
    }
}