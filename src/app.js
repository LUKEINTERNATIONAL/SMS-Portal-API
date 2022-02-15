const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const {sequelize} = require('../src/models')
const config = require('../src/config/config')
var cron = require('node-cron');
const MessageService = require('../src/Services/MessageService') 

const app = express()

app.use(morgan('combined'))
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

  // '*/10 * * * * *'

  // cron.schedule('*/10 * * * * *', () => {
  //   console.log('running a task every minute');
  //   //MessageService.getCases()
  // });