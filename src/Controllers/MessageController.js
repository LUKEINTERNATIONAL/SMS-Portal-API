const {Message} = require('../models')
const MessageService = require('../Services/MessageService')
const { Op } = require("sequelize")

module.exports = {
    async index(req, res) {
        try {
            const { userId} = req.query
            const where = {
                UserId: userId
            }

            const messages = await Message.findAll()
            res.send(messages)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a message'
            })
        }
    },
    async getYearMessages(req, res) {
        try {
            let totalSMSStatus = []
            let totalEmailStatus = []

            let totalSmsSent = []
            let totalSmsFailed = []
            let totalEmailSent = []
            let totalEmailFailed = []

            let allMessageStatus = [];
            var allMonths = []
            for(let i=0; i<12; i++){
                
                var date = new Date();
                date.setDate(date.getDate() - 335);
                var startDate = new Date(date.getFullYear(), date.getMonth()+i, 2);
                var getMonth = startDate.getMonth();
                var endDate = new Date(date.getFullYear(), date.getMonth()+1+i,1);
                startDate= startDate.toISOString().slice(0, 10)
                endDate= endDate.toISOString().slice(0, 10)

                var messages = await Message.findAll({
                    where: {
                        createdAt: { [Op.between]:[startDate,endDate]},
                    }
                })

                var countSentSMS =0;
                var countFailedSMS =0;
                var countFailedEmail =0;
                var countSentEmail =0;
                messages.map((message)=>{
                    console.log(message.email_status)
                    console.log(message.status)
                    if(message.status == "SMS sent")
                    countSentSMS++; 
                    else
                    countFailedSMS++;

                    if(message.email_status > 0 )
                        countSentEmail++;
                    else
                        countFailedEmail++;

                        console.log(countFailedEmail)
                })
                totalSmsSent.push(countSentSMS);
                totalSmsFailed.push(countFailedSMS);
                totalEmailSent.push(countSentEmail);
                totalEmailFailed.push(countFailedEmail);
                let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                allMonths.push(month[getMonth])
            }
            totalSMSStatus.push({name: "SMS sent",data:totalSmsSent},{name: "SMS failed",data:totalSmsFailed})
            totalEmailStatus.push({name: "Email sent",data:totalEmailSent},{name: "Email failed",data:totalEmailFailed})

            allMessageStatus.push(totalSMSStatus);
            allMessageStatus.push(totalEmailStatus);
            allMessageStatus.push(allMonths);

            res.send(JSON.stringify(allMessageStatus))
        } catch(err) {
            res.status(500).send({
                error: 'An error has occurred while trying to retrieve a message'
            })
        }
    },

    async post(req, res) {
        console.log("body",req.body)
        try {
            const message = await Message.create(req.body)
            res.send(message)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a message'
            })
        }
    },

    async show (req, res) {
        try {
            const message = await Message.findByPk(req.params.messageId)
            res.send(message)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a message'
            })
        }
    },

    async put (req, res) {
        try {
            const message = await Message.update({ status:req.params.status }, {
                where: {
                    id: req.params.messageId
                }
            })
            MessageService.sendMessage();
            res.send(message)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the message'
            })
        }
    },

    async delete(req, res) {
        try {
           const {messageId} = req.params
           const message = await Message.findByPk(messageId)
           await message.destroy()
           res.send(message)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a message'
            })
        }
    }
}