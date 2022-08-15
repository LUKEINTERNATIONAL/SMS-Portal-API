const {User} = require('../models')
const {Condition} = require('../models')
const {Facility} = require('../models')
const {Case} = require('../models')
const { Op } = require("sequelize"); 
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
              await compareIfDuplicateCase(emr_facility_id,ConditionName,lessFiveYearsCases,GreaterEqualFiveYearsCases)
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
          "status": "recieved"
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}

async function compareIfDuplicateCase(facilityId, conditionName, lessFiveYears, greaterEqualFiveYears) {
  let todaysDate = new Date()
  todaysDate = todaysDate.toISOString().slice(0, 10)
  
  try {
    let cases = await Case.findAll({
      where: {
        createdAt: {
          [Op.gte]: todaysDate
        },
        facility_code: facilityId,
        condition_name: conditionName,
        less_five_years: lessFiveYears,
        greater_equal_five_years: greaterEqualFiveYears
      }
    })
    

    if(cases.length > 0) {
      console.log("already saved")
    }  else {
      SaveCase.store({facility_code: facilityId,
         condition_name: conditionName, 
         less_five_years: lessFiveYears, 
         greater_equal_five_years: greaterEqualFiveYears})
    }
  } catch (error) {
    console.log(error)
  }
}