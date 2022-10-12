const {
    sequelize,
    User,
    Facility,
    Condition,
    Case,
    Respondent,
    Message,
    Role,
    CustomMessage,
    GroupCondition
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./Users.json')
const facility = require('./Facility.json')
const condition = require('./Condition.json')
const _case = require('./Case.json')
const respondent = require('./Respondent.json')
const messsage = require('./Message.json')
const role = require('./Role.json')
const customMessage = require('./CustomMessage.json')
const groupCondition = require('./GroupCondition.json')

sequelize.sync({alter: true})
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
        _case.map(_case => {
          Case.create(_case)
        }) 
      )

      await Promise.all(
        respondent.map(respondent => {
         Respondent.create(respondent)
        }) 
      )

      await Promise.all(
        messsage.map(messsage => {
         Message.create(messsage)
        }) 
      )

      await Promise.all(
        role.map(role => {
         Role.create(role)
        }) 
      )

      await Promise.all(
        customMessage.map(customMessage => {
          CustomMessage.create(customMessage)
        }) 
      )

      await Promise.all(
        groupCondition.map(groupCondition => {
          GroupCondition.create(groupCondition)
        })
      )
 
  })