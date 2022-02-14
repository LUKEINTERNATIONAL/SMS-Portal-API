module.exports = (sequelize, DataTypes) => {
    const Case = sequelize.define('Case', {
        facility_code: DataTypes.STRING,
        condition_name: DataTypes.STRING,
        less_five_years: DataTypes.STRING,
        greater_equal_five_years: DataTypes.STRING,
        message_generated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
    })

    return Case
}