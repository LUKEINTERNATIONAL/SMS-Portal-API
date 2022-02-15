const {Message} = require('../models')
const MessageService = require('./MessageService')

async function findMessages() {
    const messages = await Message.findAll({
        where: {
            status: 'pending'
        }
    })

    if (messages) {
      MessageService.resendMessage(messages)
    }

    }

findMessages()