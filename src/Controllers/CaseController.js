const {Case} = require('../models')
const { Op } = require("sequelize"); 
const { condition } = require('sequelize');
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
        try {
            let totalData = []
            
            for(let i in req.body){
                let monthData = [];
                var allMonths = []
                var condition = req.body[i];
                for(let i=0; i<12; i++){
                    var date = new Date();
                    date.setDate(date.getDate() - 335);
                    var startDate = new Date(date.getFullYear(), date.getMonth()+i, 2);
                    var getMonth = startDate.getMonth();
                    var endDate = new Date(date.getFullYear(), date.getMonth()+1+i,1);
                    startDate= startDate.toISOString().slice(0, 10)
                    endDate= endDate.toISOString().slice(0, 10)

                    let cases = await Case.findAll({
                        where: {
                            createdAt: { [Op.between]:[startDate,endDate]},
                            condition_name: condition
                        }
                    })
                    cases.sum = function(items, prop){
                        return items.reduce( function(a, b){
                            return parseInt(a) + parseInt(b[prop]);
                        }, 0);
                    };
                    
                    const cases_greater_equal_five_years = cases.sum(cases, 'greater_equal_five_years');
                    const cases_less_five_years = cases.sum(cases, 'less_five_years');
                    cases = cases_less_five_years + cases_greater_equal_five_years

                    monthData.push(cases)
                    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    allMonths.push(month[getMonth])
                }
                totalData.push({name:req.body[i],data:monthData})
            }
            totalData.push(allMonths)
            res.send(JSON.stringify(totalData))
        } catch(err) {
            res.status(500).send({
                error: JSON.stringify(err)
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