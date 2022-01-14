const AuthenticationController = require('../src/Controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../src/policies/AuthenticationControllerPolicy')
const FacilityDataReceiver = require("../src/Controllers/FacilityDataReceiver")
const MessageController = require("../src/Controllers/MessageController")


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
  app.put('/,message/:messageId',
    MessageController.put)

}