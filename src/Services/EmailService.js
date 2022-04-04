const config = require('../config/config')
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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')

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg)
    console.log("An Email was sent successfully")

  } catch (error) {
    console.log(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
};

function sendEmail(to, message) {
  sendMail({
    to: to,
    from: config.emailVariables.from,
    subject: "EIDSR Notifications",
    text: message
  })  
}

module.exports = {sendEmail}