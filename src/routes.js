const AuthenticationController = require('../src/Controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../src/policies/AuthenticationControllerPolicy')
const FacilityDataReceiver = require("../src/Controllers/FacilityDataReceiver")
const MessageController = require("../src/Controllers/MessageController")
const RespondentController = require("../src/Controllers/RespondentController")
const CaseController = require("../src/Controllers/CaseController")


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
  app.post('/message',
    MessageController.post)
  app.get('/messages/:messageId',
    MessageController.show),
  app.put('/message/:messageId/:status',
    MessageController.put)

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
  app.post('/case',
    CaseController.post)
  app.get('/cases/:caseId',
    CaseController.show)

}