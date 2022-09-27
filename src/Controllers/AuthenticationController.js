const {User} = require('../models')
const {Respondent} = require('../models') 
const { isEmpty } = require('lodash')
const { jwtSignUser, jwtSignRespondent } = require('../Services/AuthenticationService')

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
      console.log(req.body)
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      // for repondent
      if (!user) {
        try {
          const respondent = await Respondent.findOne({
            where: {
              email: email
            }
          })

          if (!respondent) {
            return res.status(403).send({
              error: 'The provided email does not exist in the database'
            })
          } else {
            // respondent
            const isPasswordValid = await respondent.comparePassword(password)
            if (!isPasswordValid) {
              return res.status(403).send({
                error: 'Invalid password'
              })
            }
      
            const respondentJson = respondent.toJSON()
            res.send({
              user: respondentJson,
              token: jwtSignRespondent(respondentJson)
            })
          }
        } catch (error) {
          return res.status(403).send({
            error: 'an error occured: '+error
          })
        }
      } else {
        // user
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
      }

    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in: '+JSON.stringify(req.body)
      })
    }
    
  }
}