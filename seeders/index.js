const {
    sequelize,
    User,
    Facility,
    Conditions,
    Cases
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./Users.json')
const facility = require('./Facility.json')
const conditions = require('./Conditions.json')
const cases = require('./Cases.json')

sequelize.sync({force: true})
  .then ( async function() {
      await Promise.all(
          users.map(user => {
              User.create(user)
          })
      )

      await Promise.all(
        facility.map(facility => {
          Facility.create(facility)
        })
      )

      await Promise.all(
        conditions.map(conditions => {
          Conditions.create(conditions)
        })
      )

      await Promise.all(
        cases.map(cases => {
          Cases.create(cases)
        }) 
      )
 
  })