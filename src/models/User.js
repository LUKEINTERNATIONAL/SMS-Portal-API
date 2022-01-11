const bcrypt = require('bcryptjs')

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  console.log(user.changed('password'))
  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  const hash = bcrypt.hashSync(user.password, salt)
  return user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    console.log(password)
    console.log(this.password)
    return bcrypt.compareSync(password, this.password)
  }

//   User.associate = function (models) {
//   }

  return User
}