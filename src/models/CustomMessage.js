module.exports = (sequelize, DataTypes) => {
    const CustomMessage = sequelize.define('CustomMessage', {
        code: {
            type: DataTypes.STRING,
            unique: true,
        },
        body: DataTypes.STRING,
        active: DataTypes.INTEGER
    })

    return CustomMessage
}