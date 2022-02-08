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
        let dataObject = req.body
        let { password } = req.body

        if (password) {
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
              })
            
            password = await user.updatePassword(password)
            dataObject = { password: password }
        }
        
        try {
            const user = await User.update(dataObject, {
                where: {
                    id: req.params.userId
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
           const {userId} = req.params
           const user = await User.findByPk(userId)
           await user.destroy()
           res.send(user)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a user'
            })
        }
    }
}