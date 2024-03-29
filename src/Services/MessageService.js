const {sequelize, Respondent, Message, Case, Facility} = require('../models')
const { Op } = require("sequelize")
const { sendEmailViaExternalAPI} = require('./EmailService')
const { getIpAddress } = require('./MachineIpAddress')
const { getHTML } = require('./mailOptionService')
const { sendToPhone } = require('./SMSService')
const console = require('console')

async function getCases() {
  var now = new Date()
  now.setDate(now.getDate())
  now.setHours(1,59,0)

  let cases = await Case.findAll({
      where: {
        message_generated: 0,
        createdAt: {
          [Op.gte]: now.toISOString()
        },
        condition_name: {
          [Op.not]: [ 'Rabies (confirmed cases)', 'Acute hemorrhagic fever syndrome (Ebola, Marburg, Lassa Fever, Rift Valley Fever (RVF), Crimean-Congo)']
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
  let date = ''

  const facility_codes = []
  for (let _case in cases) {
    const case_ = cases[_case].dataValues
    if (!facility_codes.includes(case_.facility_code)) {
      facility_codes.push(
        case_.facility_code
      )
      var d = new Date(case_.updatedAt)
      date = d.toDateString()
    }
  }

  const duplicate_f_codes = []
  for(let f_code of facility_codes) {
    const conditions = []
    cases.forEach(_case => {
      if (f_code == _case.facility_code) {
        duplicate_f_codes.push(f_code)
        conditions.push({
          condition_name: _case.condition_name,
          less_five_years: _case.less_five_years,
          greater_equal_five_years: _case.greater_equal_five_years
        })
      }
    })
    
    dataObj.push({
      'facility_name': await GetFacilityName(f_code),
      'cases': JSON.stringify(conditions),
    })

    dataObj.push({
      'date': date 
    })
  }
 
  submitEmailSummary(dataObj.reverse())
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

async function submitEmailSummary(dataObj) {
  Respondent.hasMany(Message, {foreignKey: 'respondent_id'})
  Message.belongsTo(Respondent, {foreignKey: 'respondent_id'})
  var message = await Respondent.findAll({
    include: [{
      model: Message,
      where: {email_status: '0'}
     }]
  })

  for ( let respondent of message) {
    let message_ids = []
    let email_address = respondent.dataValues.email
    for (let _message of respondent.dataValues.Messages) {
      message_ids.push(_message.dataValues.id)
    }

    const mailOptions = getHTML(dataObj, email_address)
    sendEmailViaExternalAPI(mailOptions, message_ids, getIpAddress())
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

    if (message_body.toLocaleLowerCase().includes("cholera") || message_body.toLocaleLowerCase().includes("diarrhoea")) {
      let payload = {
        message: message_body,
        phone: phone,
        messageID: message_ids,
        ipAddress: getIpAddress()+":8186"
      }
      sendToPhone(JSON.stringify(payload))
    } else {
        await Message.update({ status: 'SMS failed' }, {
          where: {
              id: message_ids
        }
        })
        sendMessage()
    }
  }
}






async function initSrvc() {
  if (await getCases() == "done") {
    setTimeout(() => {
      //old way (new implementation still being tested)
      //sendEmailMessage()
      sendMessage()
    }, 900000)
  }
}

module.exports = { initSrvc, sendMessage }

getCases()
