const {User} = require('../models')
const {Condition} = require('../models')
const {Facility} = require('../models')

module.exports = {
  async prnt() {
    await console.log("boy")
  },

  async post (req, res) {
    try {
      const {email, password, payload, emr_facility_id, emr_facility_name, concept_name_collection} = req.body
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
        //console.log(concept_name_collection)

        for(let key in concept_name_collection) {

          if (concept_name_collection[key].length > 1 ) {
            for (let id of concept_name_collection[key]) {
              try {
                await Condition.create({code: id, name: key})
              } catch (err) {
                //console.log(err)
              }
            }
          } else {
            for (let id of concept_name_collection[key]) {
              try {
                await Condition.create({code: id, name: key})
              } catch (err) {
                //console.log(err)
              }
            }
          }

          // if (concept_name_collection[key].length == 0) {
          //   try {
          //     await Condition.create({ name: key})
          //   } catch (err) {
          //     //console.log(err)
          //   }
          // }
        }

        for (let key in payload) {
          console.log("IN for Payload: ", payload[key])

          for (let age_range in payload[key]) {
            console.log("In age range: ", age_range)
            console.log( payload[key][age_range].length)
          }
        }

        try {
          await Facility.create({code: emr_facility_id, name: emr_facility_name})
        } catch (err) {
          //console.log(err)
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