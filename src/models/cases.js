module.exports = (sequelize, DataTypes) => {
    const Cases = sequelize.define('Cases', {
        facility_code: DataTypes.STRING,
        condition_name: DataTypes.STRING,
        less_five_years:  DataTypes.STRING,
        greater_equal_five_years:  DataTypes.STRING
    })

    return Cases
}