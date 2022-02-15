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
    cases = await Case.findAll({
      where: {
        message_generated: 0
      }
    })
    
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
                    var str = "Thare are "+case_.less_five_years+" "+case_.condition_name+" cases at Facilicty code: "+ case_.facility_code 
                    SaveMessage(respond_, str)
                    changeCaseStatus(case_.id)
                    caseTracker = caseTracker + 1
                }
            }
        }
    }
}

async function changeCaseStatus(caseId) {
  await Case.update({message_generated: 1}, {
    where: {
      id: caseId
    }
  })
}

async function SaveMessage(respondent_,messsage_body) {
    const message = await Message.create({
        respondent_id: respondent_.id,
        body: messsage_body,
        status: 'pending'
    })

    if (message) {
      let payload = {
          message: message.body,
          phone: respondent_.phone_pri,
          message_id: message.dataValues.id
        }
      
      collection.push(payload)

      collectionTracker = collectionTracker + 1

      if (caseTracker == collectionTracker) {
        sendToPhone(JSON.stringify(collection)) 
      }
    }
}

async function resendMessage(messages) {
  for (let message of messages) {
    let payload = {
      message: message.dataValues.body,
      phone: (await findRespondent(message.dataValues.respondent_id)).phone_pri,
      message_id: message.dataValues.id
    }

    collection.push(payload)
  }

  sendToPhone(JSON.stringify(collection))
}

async function findRespondent(respondentId) {
  const respondent = await Respondent.findOne({
    where: {
      id: respondentId
    }
  })

  return respondent.dataValues
}

function sendToPhone(data) {
  const req = request.request(
    {
      host: '192.168.1.116',
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

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
   
  req.write(data)
   
  req.end();
}

 module.exports = { getCases, resendMessage } 