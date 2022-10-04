module.exports = (sequelize, DataTypes) => {
    const Condition = sequelize.define('Condition', {
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