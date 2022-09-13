const {Case, sequelize} = require('../models')
const {Op} = require('sequelize')

async function store(dataObj) {
    try {
        await deleteCases(dataObj.facility_code);
        
    } catch (error) {
        console.error(error)
    }
    try {
       await Case.create(dataObj) 
    } catch (err) {
        console.error(err)
    }
}
async function deleteCases(facility_id) {
    let todaysDate = new Date();
        todaysDate = todaysDate.toISOString().slice(0, 10);
    try {

       const cases = await Case.destroy({
           where:{
            facility_code: 242,
            createdAt: {
                    [Op.gte]: todaysDate
                    }
           }
       })
    } catch (err) {
        console.error(err)
    }
}
module.exports =  { store }