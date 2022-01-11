module.exports = (sequelize, DataTypes) => {
    const Facility = sequelize.define('Facility', {
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        region: DataTypes.STRING
    })

    return Facility
}