const {Message} = require('../models')
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'idsrnotifications@gmail.com',
    pass: 'Axifgesczvgakugw'
  }
});


async function sendEmail(to, message, messageID) {
  var mailOptions = {
    from: 'idsrnotifications@gmail.com',
    to: to,
    subject: 'EIDSR Notifications',
    text: message
  }; 

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      changeEmailStatus(messageID)
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

module.exports = {sendEmail}