module.exports = (sequelize, DataTypes) => {
    const Respondent = sequelize.define('Respondent', {
        user_name: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        phone_pri:  DataTypes.STRING,
        phone_sec:  DataTypes.STRING,
        email:  DataTypes.STRING,
        about: DataTypes.STRING,
        facility_code:  DataTypes.STRING,
        role_id: DataTypes.STRING
    })

    return Respondent
}