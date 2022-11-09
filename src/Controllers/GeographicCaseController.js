const { sequelize } = require('../models')

async function generateCasesJoinedFacilities() {
    var dataObj = await sequelize.query(`SELECT condition_name, Facilities.name, latitude, longitude, color, (less_five_years + greater_equal_five_years) as count
        FROM Facilities
        INNER JOIN Cases
        ON Facilities.facility_code = Cases.facility_code
        INNER JOIN GroupedConditions
        ON GroupedConditions.name = Cases.condition_name
        GROUP BY GroupedConditions.name;`)

    return dataObj[0]
}

module.exports = {
    async index(req, res) {
        try {
            res.send(await generateCasesJoinedFacilities())
        } catch(err) {
            res.status(500).send({
                error: err
            })
        }
    },

}