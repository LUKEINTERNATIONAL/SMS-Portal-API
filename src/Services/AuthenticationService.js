const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

function jwtSignRespondent (respondent) {
  const FOUR_DAYS = 60 * 60 * 24 * 4
  return jwt.sign(respondent, config.authentication.jwtSecret, {
    expiresIn: FOUR_DAYS
  })
}

module.exports = { jwtSignUser, jwtSignRespondent }