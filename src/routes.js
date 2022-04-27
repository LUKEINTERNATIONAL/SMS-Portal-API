const AuthenticationController = require('../src/Controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../src/policies/AuthenticationControllerPolicy')
const FacilityDataReceiver = require("../src/Controllers/FacilityDataReceiver")
const MessageController = require("../src/Controllers/MessageController")
const RespondentController = require("../src/Controllers/RespondentController")
const CaseController = require("../src/Controllers/CaseController")
const UserController = require("../src/Controllers/UserController")
const RoleController = require("../src/Controllers/RoleController")


module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.post('/submit',
    FacilityDataReceiver.post)

  app.get('/messages',
    MessageController.index)
  app.get('/messages/year',
    MessageController.getYearMessages)
  app.post('/message',
    MessageController.post)
  app.get('/messages/:messageId',
    MessageController.show),
  app.put('/message/:messageId/:status',
    MessageController.put)
  app.delete('/message/:messageId',
   MessageController.delete),
  app.post('/updateemailstatus',
   MessageController.updateEmailStatus)

  app.get('/respondents',
    RespondentController.index)
  app.post('/respondent',
    RespondentController.post)
  app.get('/respondents/:respondentId',
    RespondentController.show),
  app.put('/respondent/:respondentId',
    RespondentController.put)
  app.delete('/respondent/:respondentId',
    RespondentController.delete)

  app.get('/cases',
    CaseController.index)
  app.post('/cases/year',
    CaseController.getYearCases)
  app.post('/case',
    CaseController.post)
  app.get('/cases/:caseId',
    CaseController.show)

  app.get('/users',
    UserController.index)
  app.post('/user',
    UserController.post)
  app.get('/users/:userId',
    UserController.show),
  app.put('/user/:userId',
    UserController.put)
  app.delete('/user/:userId',
    UserController.delete)

  app.get('/roles',
    RoleController.index)
  app.post('/role',
    RoleController.post)
  app.get('/roles/:roleId',
    RoleController.show),
  app.put('/role/:roleId/:status',
    RoleController.put)
  app.delete('/role/:roleId',
   RoleController.delete)

}