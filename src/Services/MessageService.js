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
      CasesToMessages(cases)
    }
}

// async function getRespondents() {
//     respondents = await Respondent.findAll()

//     if (respondents) {
//       for(let respondent in respondents) {
//           const respond_ = respondents[respondent].dataValues

//           for(let _case in cases) {
//               const case_ = cases[_case].dataValues

//               if (respond_.facility_code == case_.facility_code) {
//                   var messageBody = "There are " +case_.less_five_years+ " " +case_.condition_name+ " case(s) for under five And " +case_.greater_equal_five_years+
//                   " " +case_.condition_name+ " case(s) for above five at Facility Code: " +case_.facility_code
//                   SaveMessage(respond_, messageBody)
//                   changeCaseStatus(case_.id)
//                   caseTracker = caseTracker + 1
//               }
//           }
//       }
//     }
// }

function CasesToMessages(cases) {
  for(let _case in cases) {
    const case_ = cases[_case].dataValues
    var messageBody = "There are " +case_.less_five_years+ " " +case_.condition_name+ " case(s) for under five And " +case_.greater_equal_five_years+
    " " +case_.condition_name+ " case(s) for above five at Facility Code: " +case_.facility_code
    SaveMessage(messageBody)
    changeCaseStatus(case_.id)
  }
}


async function changeCaseStatus(caseId) {
  await Case.update({message_generated: 1}, {
    where: {
      id: caseId
    }
  })
}

async function SaveMessage(messsage_body) {
  respondents = await Respondent.findAll()

  if (respondents) {
    for(let respondent in respondents) {
      const respond_ = respondents[respondent].dataValues

      await Message.create({
        respondent_id: respond_.id,
        body: messsage_body,
        status: 'pending'
      })
    }
  }

}

async function sendMessage(messages) {
  for (let message of messages) {
    console.log(message.dataValues.respondent_id)
    let payload = {
      message: message.dataValues.body,
      phone: (await findRespondent(message.dataValues.respondent_id)).phone_pri,
      message_id: message.dataValues.id
    }

    collection.push(payload)
  }

  //console.log(collection)

  sendToPhone(JSON.stringify(collection))
}

async function findRespondent(respondentId) {
  const respondent = await Respondent.findOne({
    where: {
      id: 1
    }
  })
  
  if (respondent) {
  return respondent.dataValues
  }
  
  else {
    console.log("respondent not found by id: ", respondentId)
  }
  
}

function sendToPhone(data) {
  const req = request.request(
    {
      host: '192.168.11.10',
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

 module.exports = { getCases, sendMessage} 

 getCases()