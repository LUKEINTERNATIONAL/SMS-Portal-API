const {Message} = require('../models')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
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
    from: 'dsrnotification@linmalawi.org',
    to: to,
    subject: 'EIDSR Notifications',
    template: 'src/views/index',
    context: {
      message: message
  }
  }; 

    transporter.use('compile', hbs({
    viewEngine: {
      defaultLayout: false,
    },
    viewPath: '.',
  }))

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

module.exports = {sendEmail}