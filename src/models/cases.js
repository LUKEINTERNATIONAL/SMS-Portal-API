module.exports = (sequelize, DataTypes) => {
    const Cases = sequelize.define('Cases', {
        facility_code: DataTypes.STRING,
        condition_code: DataTypes.STRING,
        number:  DataTypes.STRING
    })

    return Cases
}