const {Case} = require('../models')
const { Op } = require("sequelize"); 
module.exports = {
    async index(req, res) {
        try {
            const { userId} = req.query
            const where = {
                UserId: userId
            }

            const cases = await Case.findAll()
            res.send(cases)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a _case'
            })
        }
    },
    async getYearCases(req, res) {
        let startDate = new Date();
        startDate = startDate.toISOString().slice(0, 10);
        let endDate = new Date();
        endDate.setDate(endDate.getDate() - 365);
        endDate = endDate.toISOString().slice(0, 10);

        try {

            let cases = await Case.findAll({
                where: {
                    createdAt: { [Op.between]:[endDate,startDate]}
                }
            })

            const identfier =cases[0].filter(function (el){
                return el.createdAt.toISOString().slice(0, 10) == endDate;
              });
            res.send(identfier)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a _case'
            })
        }
    },

    async post(req, res) {
        try {
            const _case = await Case.create(req.body)
            res.send(_case)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a _case'
            })
        }
    },

    async show (req, res) {
        try {
            const _case = await Case.findByPk(req.params.caseId)
            res.send(_case)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a _case'
            })
        }
    }
}