const {Message} = require('../models')
const MessageService = require('./MessageService')

async function findMessages() {
    const messages = await Message.findAll({
        where: {
            status: 'pending'
        }
    })

    if (messages) {
      MessageService.sendMessage(messages)
    }

    }

module.exports = { findMessages }

findMessages()