module.exports = (sequelize, DataTypes) => {
    const Condition = sequelize.define('GroupCondition', {
        generated_code_id: {
            type: DataTypes.STRING,
            unique: true
        },
        code: {
            type: DataTypes.STRING,
            unique: true
        },
        name: DataTypes.STRING,
        active: DataTypes.INTEGER,
        paired_with_conditions_ids: DataTypes.STRING
    })

    return Condition
}