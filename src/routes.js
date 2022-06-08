const AuthenticationController = require('../src/Controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../src/policies/AuthenticationControllerPolicy')
const FacilityDataReceiver = require("../src/Controllers/FacilityDataReceiver")
const MessageController = require("../src/Controllers/MessageController")
const RespondentController = require("../src/Controllers/RespondentController")
const CaseController = require("../src/Controllers/CaseController")
const UserController = require("../src/Controllers/UserController")
const RoleController = require("../src/Controllers/RoleController")

const isAuthenticated = require('./policies/isAuthenticated')

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

  /**
   * @swagger
   * /respondents:
   *   get:
   *     tags: [
   *       "Respondents"
   *     ]
   *     description: Get all respondents
   *     responses:
   *       200:
   *         description: Success
   * 
  */
  app.get('/respondents',
    isAuthenticated,
    RespondentController.index)
  
  /**
   * @swagger
   * /respondent:
   *   post:
   *     tags: [
   *       "Respondents"
   *     ]
   *     description: add a respondent
   *     consumes:
   *      - application/json
   *     parameters:
   *       - in: body
   *         name: respondent
   *         required: true
   *         description: The respondent to create.
   *         schema:
   *           type: object
   *           required:
   *             - userName
   *           properties:
   *             first_name:
   *               type: string
   *             last_name:
   *               type: string
   *             phone_pri:
   *               type: integer
   *             phone_sec:
   *               type: integer
   *             email:
   *               type: string
   *             role_id:
   *               type: integer
   *             about:
   *               type: string
   *     responses:
   *       200:
   *         description: Success
   * 
  */  
  app.post('/respondent',
    RespondentController.post)
    
  /**
   * @swagger
   * /respondents/{respondentId}:
   *   get:
   *     tags: [
   *       "Respondents"
   *     ]
   *     description: get a respondent
   *     parameters:
   *       - in: path
   *         name: respondentId
   *         required: true
   *         description: Numeric ID of the respondent to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Success
   *     
  */
  app.get('/respondents/:respondentId',
    RespondentController.show),

  /**
   * @swagger
   * /respondent/{respondentId}:
   *   put:
   *     tags: [
   *       "Respondents"
   *     ]
   *     description: update a respondent
   *     parameters:
   *       - in: path
   *         name: respondentId
   *         required: true
   *         description: Numeric ID of the respondent to retrieve.
   *         schema:
   *           type: integer
   *       - in: body
   *         name: respondent
   *         required: true
   *         description: The respondent to create.
   *         schema:
   *           type: object
   *           required:
   *             - userName
   *           properties:
   *             first_name:
   *               type: string
   *             last_name:
   *               type: string
   *             phone_pri:
   *               type: integer
   *             phone_sec:
   *               type: integer
   *             email:
   *               type: string
   *             role_id:
   *               type: integer
   *             about:
   *               type: string
   *     responses:
   *       200:
   *         description: Success
   *     
  */ 
  app.put('/respondent/:respondentId',
    RespondentController.put)

  /**
   * @swagger
   * /respondent/{respondentId}:
   *   delete:
   *     tags: [
   *       "Respondents"
   *     ]
   *     description: delete a respondent
   *     parameters:
   *       - in: path
   *         name: respondentId
   *         required: true
   *         description: Numeric ID of the respondent to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Success
   *     
  */
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