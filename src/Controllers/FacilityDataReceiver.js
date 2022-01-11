const {User} = require('../models')
const {Condition} = require('../models')

module.exports = {
  async prnt() {
    await console.log("boy")
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
        //console.log(payload)
        
        for (let _condition in payload) { 
          console.log(dt)
          try {
            const condition = await Condition.create({name: _condition})
            console.log("here: ",condition)
          } catch (err) {
            console.log(err)
          }
        }

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