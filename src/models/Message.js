module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        respondent_id: DataTypes.STRING,
        body: DataTypes.STRING,
        email_status: DataTypes.STRING,
        status: DataTypes.STRING
    })

    return Message
}