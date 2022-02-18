const {Case} = require('../models')

async function store(dataObj) {
    try {
       await Case.create(dataObj) 
    } catch (err) {
        console.log(err)
    }
}

module.exports =  { store }