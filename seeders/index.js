const {
    sequelize,
    User,
    Facility,
    Condition,
    Cases
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./Users.json')
const facility = require('./Facility.json')
const condition = require('./Condition.json')
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
        condition.map(condition => {
          Condition.create(condition)
        })
      )

      await Promise.all(
        cases.map(cases => {
          Cases.create(cases)
        }) 
      )
 
  })