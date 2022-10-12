const {Condition} = require('../models')
const {GroupedCondition} = require('../models')

async function groupConditions() {
    const conditions = await getAllConditions()
    
    if (conditions.length > 0) {
        for (const condition of conditions) {
            let generated_code_id = null
            let condition_code = null
            const _condition = await getCondition(condition.dataValues.name)
            if (_condition) {
                if (_condition.dataValues.name == condition.dataValues.name) {
                    generated_code_id = _condition.dataValues.generated_code_id
                    condition_code = _condition.dataValues.code

                    if (condition_code != condition.dataValues.code) {
                        const groupedCondition = await createGroupedCondition({
                            generated_code_id: generated_code_id,
                            code: condition.dataValues.code,
                            name: condition.dataValues.name,
                            active: 1
                        })

                        console.log("groupedCondition: "+groupedCondition)
                    }
                }
            } else {

            }
        }
    }
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

async function getCondition(name) {
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

groupConditions()