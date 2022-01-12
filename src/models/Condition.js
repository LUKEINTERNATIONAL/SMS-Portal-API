module.exports = (sequelize, DataTypes) => {
    const Condition = sequelize.define('Condition', {
        code: {
            type: DataTypes.STRING,
            unique: true
        },
        name: DataTypes.STRING
    })

    return Condition
}