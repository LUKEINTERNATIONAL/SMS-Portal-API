module.exports = (sequelize, DataTypes) => {
    const Conditions = sequelize.define('Conditions', {
        code: DataTypes.STRING,
        name: DataTypes.STRING
    })

    return Conditions
}