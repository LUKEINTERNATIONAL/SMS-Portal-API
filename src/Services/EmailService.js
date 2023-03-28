const {Message} = require('../models')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const request = require ('http');
require('dotenv').config(); // Load environment variables from .env file

var transporter = nodemailer.createTransport({
  host: "mx-10.globemw.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '',
    pass: ''
  }
});

async function sendEmail(to, message, messageIDs) {
  var mailOptions = {
    from: 'idsrnotification@linmalawi.org',
    to: to,
    subject: 'EIDSR Notifications',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      changeEmailStatus(messageIDs)
    }
  });
}

function changeEmailStatus(messageIdsArray) {
  messageIdsArray.forEach(messageId => {
    Message.update({email_status: 1}, {
      where: {
        id: messageId
      }
    })
  });
}

function sendEmailViaExternalAPI(mailOptions, messageIDs, ipAddress) {
  const data = {
    mailOptions: mailOptions,
    messageIDs: messageIDs,
    ipAddress: ipAddress

  }

  const payload = JSON.stringify(data)
  const req = request.request(
    {
      host: process.env.SMS_EMAIL_SERVICE_IP_ADDR,
      port: process.env.SMS_EMAIL_SERVICE_PORT,
      path: '/sendemail',
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
  req.write(payload)
  req.end(); 

}

module.exports = {sendEmail, sendEmailViaExternalAPI}