module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role_id: DataTypes.STRING,
        role_name: DataTypes.STRING,
    })

    return Role
}