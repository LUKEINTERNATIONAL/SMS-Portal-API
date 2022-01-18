const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const {sequelize} = require('../src/models')
const config = require('../src/config/config')

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