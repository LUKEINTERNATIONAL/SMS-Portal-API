module.exports = (sequelize, DataTypes) => {
    const Respondent = sequelize.define('Respondent', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        phone_pri:  DataTypes.STRING,
        phone_sec:  DataTypes.STRING,
        email:  DataTypes.STRING,
        facility_code:  DataTypes.STRING
    })

    return Respondent
}