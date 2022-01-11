module.exports = (sequelize, DataTypes) => {
    const Condition = sequelize.define('Condition', {
        code: DataTypes.STRING,
        name: DataTypes.STRING
    })

    return Condition
}