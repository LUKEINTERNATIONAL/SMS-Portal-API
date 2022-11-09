const { sequelize } = require('../models')

async function generateCasesJoinedFacilities() {
    var dataObj = await sequelize.query(`SELECT condition_name, Facilities.name, latitude, longitude, (less_five_years + greater_equal_five_years) as count
        FROM Facilities
        INNER JOIN Cases
        ON Facilities.facility_code = Cases.facility_code;`)

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