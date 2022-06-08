const {Respondent} = require('../models')
const {Message} = require('../models')
const {Case} = require('../models')
const {Facility} = require('../models')
const { Op } = require("sequelize")
const {sendEmail, sendEmailViaExternalAPI} = require('./EmailService')
const { getIpAddress } = require('./MachineIpAddress')
const  request = require ('http');

async function getCases() {
  let cases = await Case.findAll({
      where: {
        message_generated: 0
      }
    })
    
    if (cases) { 
      CasesToMessages(cases)
    }

    else {
      console.log("There are no pending cases to pull")
      return
    }
}

async function CasesToMessages(cases) {
  for(let _case in cases) {
    const case_ = cases[_case].dataValues
    let total = parseInt(case_.less_five_years ) + parseInt(case_.greater_equal_five_years)
    let facility_name = await GetFacilityName(case_.facility_code)
    var messageBody = "There are " +total+ " " +case_.condition_name+ " case(s) at " +facility_name
    SaveMessage(messageBody)
    changeCaseStatus(case_.id)
  }
}

async function GetFacilityName(facility_code) {
  let facility = await Facility.findAll({
    where: {
      code: facility_code
  }
  })

  if(facility) {
    return facility[0].dataValues.name
  }
   
  else {
    return facility_code
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
  Respondent.hasMany(Message, {foreignKey: 'respondent_id'})
  Message.belongsTo(Respondent, {foreignKey: 'respondent_id'})
  var message = await Respondent.findAll({
    include: [{
      model: Message,
      where: {
        status: {
          [Op.not]: 'SMS sent'
        }
      },
      limit: 1
     }]
  });
  if(message[0].dataValues.Messages.length > 0)
  {
    let payload = [{
      message: message[0].dataValues.Messages[0].dataValues.body,
      phone: message[0].dataValues.phone_pri,
      message_id: message[0].dataValues.Messages[0].dataValues.id
    }]
    sendToPhone(JSON.stringify(payload))
  }
}

async function sendEmailMessage() {
  Respondent.hasMany(Message, {foreignKey: 'respondent_id'})
  Message.belongsTo(Respondent, {foreignKey: 'respondent_id'})
  var message = await Respondent.findAll({
    include: [{
      model: Message,
      where: {email_status: '0'}
     }]
  });

  for ( let respondent of message) {
    let message_body = ''
    let message_ids = []
    let email_address = respondent.dataValues.email
    for (let _message of respondent.dataValues.Messages) {
      message_ids.push(_message.dataValues.id)
      message_body+=_message.dataValues.body+'\n'
    }
    //sendEmail(email_address, message_body, message_ids)
    sendEmailViaExternalAPI(email_address, message_body, message_ids)
  }
}

async function sendMessage() {
  Respondent.hasMany(Message, {foreignKey: 'respondent_id'})
  Message.belongsTo(Respondent, {foreignKey: 'respondent_id'})
  var message = await Respondent.findAll({
    include: [{
      model: Message,
      where: {status: 'pending'},
      limit: 1
     }]
  });
  if(message[0].dataValues.Messages.length > 0) {
    let payload = [{
      message: message[0].dataValues.Messages[0].dataValues.body,
      phone: message[0].dataValues.phone_pri,
      message_id: message[0].dataValues.Messages[0].dataValues.id,
      ipAddress: getIpAddress()+":8186"
    }]
    sendToPhone(JSON.stringify(payload))
  } else {
    sendFailedMessage();
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

module.exports = { getCases, sendMessage, sendEmailMessage} 
