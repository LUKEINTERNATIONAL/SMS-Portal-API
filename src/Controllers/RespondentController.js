const {Respondent} = require('../models')
const { Role} = require('../models')

module.exports = {
    /**
     * @swagger
     * /Respondents:
     *   get:
     *     description: Get all respondents
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    async index(req, res) {
        try {
            const { userId} = req.query
            const where = {
                UserId: userId
            }

            Role.hasMany(Respondent, {foreignKey: 'role_id'})
            // Role.belongsTo(Respondent, {foreignKey: 'role_id'})
            const role = await Role.findAll({
                include: [{
                    model: Respondent
                }],
            })
            res.send(role)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to retrive a respondents'
            })
        }
    },

    async post(req, res) {
        try {
            const respondent = await Respondent.create(req.body)
            res.send(respondent)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a respondent'
            })
        }
    },

    async reg(req, res) {
        try {
            const respondent = await Respondent.create(req.body)
            res.send(respondent)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured tryn to create a respondent'
            })
        }
    },

    async show (req, res) {
        try {
            const respondent = await Respondent.findByPk(req.params.respondentId)
            res.send(respondent)
        } catch(error) {
            res.status(500).send({
                error: 'An error has occured tryn to retrive a respondent'
            })
        }
    },

    /**
     * @swagger
     * /Respondents:
     *   put:
     *     description: update a respondent
     *     responses:
     *       200:
     *         description: Success
     */
    async put (req, res) {
        try {
            const respondent = await Respondent.update(req.body, {
                where: {
                    id: req.params.respondentId
                }
            })
            res.send(respondent)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured tryn to update the respondent'
            })
        }
    },

    async delete(req, res) {
        try {
           const {respondentId} = req.params
           const respondent = await Respondent.findByPk(respondentId)
           await respondent.destroy()
           res.send(respondent)
        } catch(err) {
            res.status(500).send({
                error: 'An error has occured trying to delete a respondent'
            })
        }
    }
}