module.exports = (sequelize, DataTypes) => {
    const Facility = sequelize.define('Facility', {
        facility_code: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        region: DataTypes.STRING,
        vpn_ip_address: DataTypes.STRING,
        last_pinged: DataTypes.DATE,
        server_username: DataTypes.STRING,
        server_password: DataTypes.STRING
    })

    return Facility
}