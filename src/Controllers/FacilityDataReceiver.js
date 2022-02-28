const {User} = require('../models')
const {Condition} = require('../models')
const {Facility} = require('../models')
const {Case} = require('../models')
const SaveCase = require('../Services/SaveCase')

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
          console.log(payload)
          let lessFiveYearsCases
          let GreaterEqualFiveYearsCases
          let ConditionName = key
          let total = 0

          for (let age_range in payload[key]) {
            if (age_range == '<5yrs') {
              lessFiveYearsCases = payload[key][age_range].length
              if (lessFiveYearsCases != 0) {
                total++
              }
            }
            if (age_range == '>=5yrs') {
              GreaterEqualFiveYearsCases = payload[key][age_range].length
              if (GreaterEqualFiveYearsCases != 0) {
                total++
              }
            }
          }

          if (total > 0) {
            try {
              SaveCase.store({facility_code: emr_facility_id, condition_name: ConditionName, less_five_years: lessFiveYearsCases, greater_equal_five_years: GreaterEqualFiveYearsCases})
              // await Case.create({facility_code: emr_facility_id, condition_name: ConditionName, less_five_years: lessFiveYearsCases, greater_equal_five_years: GreaterEqualFiveYearsCases})
            } catch (err) {
              //console.log(err)
            } 
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