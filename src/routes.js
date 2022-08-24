const AuthenticationController = require('../src/Controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../src/policies/AuthenticationControllerPolicy')
const FacilityDataReceiver = require("../src/Controllers/FacilityDataReceiver")
const MessageController = require("../src/Controllers/MessageController")
const RespondentController = require("../src/Controllers/RespondentController")
const CaseController = require("../src/Controllers/CaseController")
const UserController = require("../src/Controllers/UserController")
const RoleController = require("../src/Controllers/RoleController")
const FacilityController = require("../src/Controllers/FacilityController")

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {

  /**
   * @swagger
   * /register:
   *   post:
   *     tags: [
   *       "Users"
   *     ]
   *     description: use this path for adding a user
   *     consumes:
   *      - application/json
   *     parameters:
   *       - in: body
   *         name: register
   *         required: true
   *         description: The user to create.
   *         schema:
   *           type: object
   *           required:
   *             - userName
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *     responses:
   *       200:
   *         description: Success
   * 
  */ 
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  
  /**
   * @swagger
   * /login:
   *   post:
   *     tags: [
   *       "Users"
   *     ]
   *     description: add a respondent
   *     consumes:
   *      - application/json
   *     parameters:
   *       - in: body
   *         name: user
   *         required: true
   *         description: The user to login.
   *         schema:
   *           type: object
   *           required:
   *             - userName
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *     responses:
   *       200:
   *         description: Success
   * 
  */ 
  app.post('/login',
    AuthenticationController.login)

  app.post('/submit',
    FacilityDataReceiver.post)

  app.get('/messages',
    isAuthenticated,
    MessageController.index)
  app.get('/messages/year',
    isAuthenticated,
    MessageController.getYearMessages)
  app.post('/message',
    isAuthenticated,
    MessageController.post)
  app.get('/messages/:messageId',
    isAuthenticated,
    MessageController.show),
  app.put('/message/:messageId/:status',
    MessageController.put)
  app.delete('/message/:messageId',
   isAuthenticated,
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
    isAuthenticated,
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
    isAuthenticated,
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
    isAuthenticated,
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
    isAuthenticated,
    RespondentController.delete)

  /**
   * @swagger
   * /cases:
   *   get:
   *     tags: [
   *       "Cases"
   *     ]
   *     description: Get all respondents
   *     responses:
   *       200:
   *         description: Success
   * 
  */
  app.get('/cases',
    isAuthenticated,
    CaseController.index)


  app.post('/cases/year',
    isAuthenticated,
    CaseController.getYearCases)
  
  app.post('/case',
    isAuthenticated,
    CaseController.post)
  
  /**
   * @swagger
   * /cases/{caseId}:
   *   get:
   *     tags: [
   *       "Cases"
   *     ]
   *     description: get a case
   *     parameters:
   *       - in: path
   *         name: caseId
   *         required: true
   *         description: Numeric ID of the case to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Success
   *     
  */
  app.get('/cases/:caseId',
    isAuthenticated,
    CaseController.show)

  /**
   * @swagger
   * /users:
   *   get:
   *     tags: [
   *       "Users"
   *     ]
   *     description: Get all users
   *     responses:
   *       200:
   *         description: Success
   * 
  */
  app.get('/users',
    isAuthenticated,
    UserController.index)
   
  app.post('/user',
    isAuthenticated,
    UserController.post)
  
  /**
   * @swagger
   * /users/{userId}:
   *   get:
   *     tags: [
   *       "Users"
   *     ]
   *     description: get a user
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Success
   *     
  */  
  app.get('/users/:userId',
    isAuthenticated,
    UserController.show),

 
  app.put('/user/:userId',
    isAuthenticated,
    UserController.put)

  /**
   * @swagger
   * /user/{userId}:
   *   delete:
   *     tags: [
   *       "Users"
   *     ]
   *     description: delete a case
   *     parameters:
   *       - in: path
   *         name: caseId
   *         required: true
   *         description: Numeric ID of the case to delete.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Success
   *     
  */
  app.delete('/user/:userId',
    isAuthenticated,
    UserController.delete)

  /**
   * @swagger
   * /roles:
   *   get:
   *     tags: [
   *       "Roles"
   *     ]
   *     description: Get all roles
   *     responses:
   *       200:
   *         description: Success
   * 
  */
  app.get('/roles',
  isAuthenticated,
    RoleController.index)
  app.post('/role',
    isAuthenticated,
    RoleController.post)
  app.get('/roles/:roleId',
    isAuthenticated,
    RoleController.show),
  app.put('/role/:roleId/:status',
    isAuthenticated,
    RoleController.put)
  app.delete('/role/:roleId',
   isAuthenticated,
   RoleController.delete)

  app.get('/facilities',
   isAuthenticated,
   FacilityController.index)
  app.get('/facilities/:facilityId',
   isAuthenticated,
   FacilityController.show)

}