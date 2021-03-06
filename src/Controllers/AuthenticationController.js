const {User} = require('../models')
const { isEmpty } = require('lodash')
const { jwtSignUser } = require('../Services/AuthenticationService')

module.exports = {

  async register (req, res) {
    if (!isEmpty(!req.body)) {
      try {
        const user = await User.create(req.body)
        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: jwtSignUser(userJson)
        })
      } catch (err) {
        res.status(400).send({
          error: 'This email account is already in use.'
        })
      }
    } else {
      res.status(400).send({
        error: 'details not provided'
      })
    }
  },

  async login (req, res) {

    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })


      if (!user) {
        return res.status(403).send({
          error: 'The provided email does not exist in the database'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Invalid password'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
    
  }
}