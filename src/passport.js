
const passport = require('passport')
const {User, Respondent } = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      })
      if (!user) {
        /** a bit confusing i know.. will rework this code */
        try {
          const respondent = await Respondent.findOne({
            where: {
              id: jwtPayload.id
            }
          })
          if(!respondent) {
            return done(new Error(), false)
          }
          return done(null, respondent)
        } catch (error) {
          return done(new Error(), false)
        }
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = passport