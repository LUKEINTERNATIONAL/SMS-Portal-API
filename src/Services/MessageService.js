const {Respondent} = require('../models')
const {Message} = require('../models')
const {Case} = require('../models')
const  request = require ('http');

let cases
let respondents
var collection = []
let collectionTracker = 0
let caseTracker = 0

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
                    caseTracker = caseTracker + 1
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
        let msg_id = message.dataValues.id
        let phone = respondent_.phone_pri
        let msg = message.body
        
        let payload = {
              message: msg,
              phone: phone,
              message_id: msg_id
            }
        
        collection.push(payload)

        collectionTracker = collectionTracker + 1

        if (caseTracker == collectionTracker) {
          sendToPhone(JSON.stringify(collection)) 
        }
    }
}


function sendToPhone(data) {
  const req = request.request(
    {
      host: '192.168.11.21',
      port: '3003',
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    response => {
      console.log(response.statusCode); // 200
    }
  );
   
  req.write(data)
   
  req.end();
}

 getCases()