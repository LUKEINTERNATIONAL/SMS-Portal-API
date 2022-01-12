module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        body: DataTypes.STRING,
        respondent_id: DataTypes.STRING
    })

    return Message
}