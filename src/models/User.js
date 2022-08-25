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
  const User = sequelize.define('User', {
    role_id: DataTypes.STRING,
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_pri:  DataTypes.STRING,
    phone_sec:  DataTypes.STRING,
    about: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.prototype.updatePassword = function (password) {
    const salt = bcrypt.genSaltSync(SALT_FACTOR)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }

//   User.associate = function (models) {
//   }

  return User
}