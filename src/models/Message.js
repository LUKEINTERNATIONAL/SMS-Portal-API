module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        respondent_id: DataTypes.STRING,
        body: DataTypes.STRING,
        status: DataTypes.STRING
    })

    return Message
}