const {Message} = require('../models')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const request = require ('http');
var transporter = nodemailer.createTransport({
  host: "mx-10.globemw.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'idsrnotification@linmalawi.org',
    pass: 'lukeinternational'
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

function sendEmailViaExternalAPI(to, message, messageIDs) {
  const data = {
    to: to,
    message: message,
    messageIDs: messageIDs
  }

  const payload = JSON.stringify(data)
  const req = request.request(
    {
      host: '192.168.11.11',
      port: '8188',
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