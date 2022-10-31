const express = require('express')
var fs = require('fs')
var path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const {sequelize} = require('../src/models')
const config = require('../src/config/config')
var cron = require('node-cron')
const MessageService = require('../src/Services/MessageService')
const InitiateSendMessages = require('../src/Services/InitiateSendMessages')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const TrackerService = require('../src/Services/TrackerService')
const FindRemoteConditions = require('../src/Services/FindRemoteConditins')
const Utils = require('../src/Services/Utils')


const app = express()

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1', // YOU NEED THIS
    info: {
      title: "SMS Portal API",
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data for EIDSR Notification Portal.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'EIDSRNotificationPortal',
        url: 'http://localhost:8080',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        url: 'http://localhost:8186',
        description: 'Development server',
      },
    ],
  },
  apis: [`${__dirname}/routes.js`],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyparser.json())
app.use(cors())

app.get('/status', (req, res) => {
    res.send({
        message: 'hello word!'
    })
})

require('../src/routes')(app)
sequelize.sync({})
  .then ( () => {
    app.listen(process.env.PORT || 8186)
    console.log(`Server started on port ${config.port}`)
  })

  cron.schedule('*/6 * * * *', () => {
    //InitiateSendMessages.findMessages()
    if (Utils.checkTimeIf1700()) {
      MessageService.initSrvc()
    }
  }); 

  //for updating list of pinged facilities
  cron.schedule('*/5 * * * *', () => {
    TrackerService.initSrvc()
    FindRemoteConditions.findFacilitities()
  })

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | month
  // | | | day of month
  // | | hour
  // | minute
  // second ( optional )
  // 11.250
  // lin1088