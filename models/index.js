const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize (
    "eidsr_sms_portal",
    "root",
    "root",
    {
      host: 'localhost',
      dialect: 'mysql'
    }
)

// fs
//   .readdirSync(__dirname)
//   .filter((file) =>
//      file != 'index.js'
//   )
//   .forEach((file) => {
//       //const model = sequelize.import(path.join(__dirname, file))
//       const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
//       db[model.name] = model
//   })

  // db.sequelize = sequelize

module.exports = sequelize