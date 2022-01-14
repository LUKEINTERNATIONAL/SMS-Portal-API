const {Respondent} = require('../models')
const {Message} = require('../models')
const {Case} = require('../models')
const https = require('http')

let cases
let respondents

async function getCases() {
    cases = await Case.findAll()
    
    if (cases) { 
        getRespondents()
    }
}

async function getRespondents() {
    respondents = await Respondent.findAll()

    if (respondents) {
        for(let respondent in respondents) {
            const respond_ = respondents[respondent].dataValues

            for(let _case in cases) {
                const case_ = cases[_case].dataValues

                if (respond_.facility_code == case_.facility_code) {
                    SaveMessage(respond_, case_.condition_name)
                }
            }
        }
    }
}

async function SaveMessage(respondent_,messsage_body) {
    const message = await Message.create({
        respondent_id: respondent_.id,
        body: messsage_body
    })

    if (message) {
        console.log(message.dataValues)
        let msg_id = message.dataValues.id
        let phone = respondent_.phone_pri
        let msg = message.body

        console.log(msg_id)
        console.log(phone)
        console.log(msg)
        
        let payload = [
            {
                message: msg,
                phone: phone,
                message_id: msg_id
            }
        ]



        console.log(payload)

        sendMessage(JSON.stringify(payload))
    }
}

function sendMessage(data) {
      
      const options = {
        hostname: '192.168.11.45',
        port: 3003,
        path: '/todos',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }
      
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
      req.on('error', error => {
          console.log("ine error mode")
        console.error(error)
      })
      
      req.write(data)
      req.end()
}

 getCases()