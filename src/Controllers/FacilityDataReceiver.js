const {User} = require('../models')
const {Condition} = require('../models/Condition')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },

  async addToConditionsTable(data) {
    try {
      const condition = await Condition.create(data)
      console.log(condition)
    } catch (err) {
      console.log(err)
    }
  },

  async post (req, res) {
    try {
      const {email, password, payload, emr_facility_id, emr_facility_name} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      console.log("###############################user: ", user)

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect email'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Invalid password'
        })
      }

      if(user) {
        console.log("emr_facility_id: ", emr_facility_id)
        console.log("emr_facility_name: ", emr_facility_name)
        console.log(payload)
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}