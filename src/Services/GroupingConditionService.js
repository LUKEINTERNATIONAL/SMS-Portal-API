const { random } = require('lodash')
const {Condition} = require('../models')
const {GroupedCondition} = require('../models')
const { sequelize } = require('../models')

async function groupConditions() {
    const conditions = await getAllConditions()
    if (conditions.length > 0) {
        for (let condition of conditions) {
            const filteredConditions = filterConditions(conditions, condition.dataValues.name)
            for (const filtredCondition of filteredConditions) {
                condition = filtredCondition
                let generated_code_id = null
                let condition_code = null
                let generated_code = null
                const _condition = await getGroupedCondition(condition.dataValues.name)
                if (_condition) {
                    if (_condition.dataValues.name == condition.dataValues.name) {
                        generated_code_id = _condition.dataValues.generated_code_id
                        condition_code = _condition.dataValues.code
                        generated_code = _condition.color
    
                        if (condition_code != condition.dataValues.code) {
                            await createGroupedCondition({
                                generated_code_id: generated_code_id,
                                code: condition.dataValues.code,
                                name: condition.dataValues.name,
                                active: 1,
                                color: generated_code
                            })
                        }
                    }
                } else {
                    const LastGeneratedCode =  parseInt( await getLastGeneratedCode()) +  parseInt(6)
                    await createGroupedCondition({
                        generated_code_id: LastGeneratedCode,
                        code: condition.dataValues.code,
                        name: condition.dataValues.name,
                        active: 1,
                        color: generateRandomColorHex()
                    })
                }
            }
        }
    }
}

function generateRandomColorHex() {
    return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
}

async function getAllConditions() {
    try {
        const conditions = await Condition.findAll()
        return conditions
    } catch (error) {
        console.error(error)
        return []
    }
}

async function getGroupedCondition(name) {
    try {
        const condition = await GroupedCondition.findOne({
            where: {
                name: name
            }
        })
        return condition
    } catch (error) {
        console.log(error)
        return []
    }
}

async function createGroupedCondition(dataObject) {
    try {
        const groupedCondition = await GroupedCondition.create(dataObject)
        return groupedCondition
    } catch (error) {
        console.log(error)
        return []
    }
}

function filterConditions( object, name) {
    const obj = object.filter( obj => {
        return obj.name == name
    })
    return obj
}

async function getLastGeneratedCode() {
    try {
        const condition = await sequelize.query(`SELECT * FROM eidsr_sms_portal.GroupedConditions
        where generated_code_id  
           IS NOT NULL  
               order by id 
                   desc limit 1;`);
   
   
       return condition[0][0]["generated_code_id"]
    } catch (error) {
        console.log(error)
        return 594
    }
}

groupConditions()

module.exports = { groupConditions }