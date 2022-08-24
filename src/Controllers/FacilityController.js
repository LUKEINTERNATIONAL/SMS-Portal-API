const {Facility} = require('../models')

module.exports = {

    async index(req, res) {
        try {
            const facilities = await Facility.findAll()
            res.send(facilities)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a _facility: '+err
            })
        }
    },

    async show (req, res) {
        try {
            const facility = await Facility.findByPk(req.params.FacilityId)
            res.send(facility)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a a _facility: '+err
            })
        }
    },
}