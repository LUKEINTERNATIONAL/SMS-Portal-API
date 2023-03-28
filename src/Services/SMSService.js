const  request = require ('http')
const { sequelize } = require('../models')
require('dotenv').config(); // Load environment variables from .env file
const { getIpAddress } = require('./MachineIpAddress')

function sendToPhone(data) {
    const req = request.request(
      {
        host: process.env.SMS_EMAIL_SERVICE_IP_ADDR,
        port: process.env.SMS_EMAIL_SERVICE_PORT,
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
      console.error(`problem with request: ${e.message}`)
    }); 
    req.write(data)
    req.end()
  
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

  module.exports = {
    sendToPhone
  }