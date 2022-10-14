module.exports = (sequelize, DataTypes) => {
    const Condition = sequelize.define('GroupedConditionForCustomMessage', {
        generated_code_id: {
            type: DataTypes.STRING,
            unique: false
        },
        customMessageCode: {
            type: DataTypes.STRING,
            unique: false
        },
        active: {
            type: DataTypes.INTEGER,
            default: 0
        }
    })

    return Condition
}