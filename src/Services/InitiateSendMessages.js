const {Message} = require('../models')
const MessageService = require('./MessageService')
const { Op } = require("sequelize")

async function findMessages() {
    const messages = await Message.findAll({
        where: {
            status: {
                [Op.not]: 'pending'
              }
        }
    })

    if (messages) {
      // console.log("*********************************************************************",messages)
      MessageService.sendMessage(messages)
    }

    }

module.exports = { findMessages }