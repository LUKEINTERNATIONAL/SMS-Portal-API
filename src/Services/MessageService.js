const {sequelize, Respondent, Message, Case, Facility} = require('../models')
const { Op } = require("sequelize")
const { sendEmail, sendEmailViaExternalAPI} = require('./EmailService')
const { getIpAddress } = require('./MachineIpAddress')
const  request = require ('http')

async function getCases() {
  const TODAY_START = new Date().setHours(0, 0, 0, 0)
  const NOW = new Date()
  let cases = await Case.findAll({
      where: {
        message_generated: 0,
        createdAt: { 
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW
        },
      }
    })
    
    if (cases.length > 0) { 
     return CasesToMessages(cases)
    }

    else {
      console.log("There are no pending cases to pull")
      return 1
    }
}

async function SummaryForRespondents(cases) {
  const dataObj = []
  const facilities = await Facility.findAll()
  const condition_names = []
  for (let _case in cases) {
    const case_ = cases[_case].dataValues
    if (!condition_names.includes(case_.condition_name)) {
      condition_names.push(
        case_.condition_name
      )
    }

  }
  dataObj.push({
    'condition_names': JSON.stringify(condition_names)
  })
  for(let facility in facilities) {
    const _facility = facilities[facility].dataValues
    const facilityCode = _facility.facility_code

    if(facilityCode != null) {
      const conditions = []
      for(let _case in cases) {
        const case_ = cases[_case].dataValues
        if (facilityCode == case_.facility_code) {
          conditions.push({
            condition_name: case_.condition_name,
            less_five_years: case_.less_five_years,
            greater_equal_five_years: case_.greater_equal_five_years
          })
        }
      }
      
      if (conditions.length) {
        dataObj.push({
          'facility_name': await GetFacilityName(facilityCode),
          'cases': JSON.stringify(conditions)
        })
      }
    } 
  }
  console.log(dataObj)
  submitEmailSummary(dataObj)
}

async function CasesToMessages(cases) {
  for(let _case in cases) {
    const case_ = cases[_case].dataValues
    let total = parseInt(case_.less_five_years ) + parseInt(case_.greater_equal_five_years)
    let facility_name = await GetFacilityName(case_.facility_code)
    var messageBody = "There are " +total+ " " +case_.condition_name+ " suspected case(s) at " +facility_name
    SaveMessage(messageBody)
    changeCaseStatus(case_.id)
  }
  SummaryForRespondents(cases)
  return "done"
}

async function GetFacilityName(facility_code) {

  try {
    let facility = await Facility.findAll({
      where: {
        facility_code: facility_code
    }
    })

    if(facility) {
      return facility[0].dataValues.name
    }
     
    else {
      return facility_code
    }

  } catch (error) {
    console.error("an error occured: "+error)
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
  let respondents = await Respondent.findAll()

  if (respondents) {
    for(let respondent in respondents) {
      const respond_ = respondents[respondent].dataValues

      await Message.create({
        respondent_id: respond_.id,
        body: messsage_body,
        status: 'pending',
        email_status: '0'
      })
    }
  }

  else {
    console.log("There are no respondents in table")
  }
}
async function sendFailedMessage() {
  var message = await sequelize.query(`SELECT * FROM Respondents r 
  INNER JOIN Messages m on r.id = m.respondent_id 
  where status !='SMS sent'
  order by m.updatedAt asc limit 1;`);

  var phone = 0;
  if(message[0][0].phone_sec != "")
    phone  = message[0][0].phone_sec
  else
    phone  = message[0][0].phone_pri

  if(message[0].length > 0) {
    let payload = {
    message: message[0][0]['body'],
    phone: phone,
    message_id: message[0][0].id,
    ipAddress: getIpAddress()+":8186"
    }
    console.log(JSON.stringify(payload))
    sendToPhone(JSON.stringify(payload))
  } 
}

// async function sendEmailMessage() {
//   Respondent.hasMany(Message, {foreignKey: 'respondent_id'})
//   Message.belongsTo(Respondent, {foreignKey: 'respondent_id'})
//   var message = await Respondent.findAll({
//     include: [{
//       model: Message,
//       where: {email_status: '0'}
//      }]
//   });

//   for ( let respondent of message) {
//     let message_body = ''
//     let message_ids = []
//     let email_address = respondent.dataValues.email
//     for (let _message of respondent.dataValues.Messages) {
//       message_ids.push(_message.dataValues.id)
//       message_body+=_message.dataValues.body+'\n'
//     }
//     //sendEmail(email_address, message_body, message_ids)
//     sendEmailViaExternalAPI(email_address, message_body, message_ids)
//   }
// }

async function submitEmailSummary(dataObj) {
  Respondent.hasMany(Message, {foreignKey: 'respondent_id'})
  Message.belongsTo(Respondent, {foreignKey: 'respondent_id'})
  var message = await Respondent.findAll({
    include: [{
      model: Message,
      where: {email_status: '0'}
     }]
  });

  for ( let respondent of message) {
    let message_ids = []
    let email_address = respondent.dataValues.email
    for (let _message of respondent.dataValues.Messages) {
      message_ids.push(_message.dataValues.id)
    }
    sendEmailViaExternalAPI(email_address, dataObj, message_ids)
  }
}

async function sendMessage() {
  var message = await sequelize.query(`SELECT *, DATE_FORMAT(m.createdAt, '%Y-%m-%d') FROM Respondents r 
                INNER JOIN Messages m on r.id = m.respondent_id 
                where status ='pending' AND date(m.createdAt) = curdate()
                order by m.updatedAt asc limit 1;`);

  if ( message[0].length > 0 ) {
    let message_body = ''
    let message_ids = []
    let phone

    for ( let _msg of message[0]) {
      message_body +=_msg.body+'\n'
      message_ids.push(_msg.id)
      phone = _msg.phone_pri
    }

    let payload = {
      message: message_body,
      phone: phone,
      messageID: message_ids,
      ipAddress: getIpAddress()+":8186"
    }
    sendToPhone(JSON.stringify(payload))
  }
}

function sendToPhone(data) {
  const req = request.request(
    {
      host: '192.168.11.11',
      port: '8188',
      path: '/sendsms',
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

async function initSrvc() {
  if (await getCases() == "done") {
    setTimeout(() => {
      //old way (new implementation still being tested)
      //sendEmailMessage()
      sendMessage()
    }, 300000);
  }
}

module.exports = { initSrvc, sendMessage }