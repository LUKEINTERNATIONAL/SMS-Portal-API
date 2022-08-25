const bcrypt = require('bcryptjs')
const SALT_FACTOR = 8

function hashPassword (user, options) {
  if (!user.changed('password')) {
    return
  }

  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  const hash = bcrypt.hashSync(user.password, salt)
  return user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
    const Respondent = sequelize.define('Respondent', {
        user_name: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        phone_pri:  DataTypes.STRING,
        phone_sec:  DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        about: DataTypes.STRING,
        facility_code:  DataTypes.STRING,
        role_id: DataTypes.STRING,
        password: DataTypes.STRING
    },{
        hooks: {
          beforeCreate: hashPassword,
        }
    })

    Respondent.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    
    Respondent.prototype.updatePassword = function (password) {
        const salt = bcrypt.genSaltSync(SALT_FACTOR)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    }

    return Respondent
}