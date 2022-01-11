module.exports = (sequelize, DataTypes) => {
    const Condition = sequelize.define('Condition', {
        code: DataTypes.STRING,
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    })

    return Condition
}