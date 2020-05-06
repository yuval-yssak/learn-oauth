import passport from 'passport'
import passportJwt from 'passport-jwt'
import mongoDB from 'mongodb'

import passportLocal from 'passport-local'
import { JWT_SECRET } from './config.js'
import { findUser } from './dao/users.js'

const { ObjectID } = mongoDB
const { Strategy: JwtStrategy, ExtractJwt } = passportJwt
const { Strategy: LocalStrategy } = passportLocal

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      console.log('in verifying function', payload)
      try {
        // Find the user specified in token
        const user = await findUser({ _id: ObjectID(payload.sub) })

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false)
        }

        // Otherwise, return the user
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      // Find the user given the email
      const user = await findUser({ email })

      // If not, handle it
      if (!user) {
        return done(null, false)
      }

      // Check if the password is correct

      // If not, handle it

      // Otherwise, return the user
    }
  )
)

export default passport