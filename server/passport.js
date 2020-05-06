import passport from 'passport'
import passportJwt from 'passport-jwt'
import mongoDB from 'mongodb'
import bcrypt from 'bcryptjs'
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
      try {
        console.log('verifying local strategy', email, password)
        // Find the user given the email
        const user = await findUser({ email })
        console.log('user is ', user)
        // If not, handle it
        if (!user) {
          return done(null, false)
        }
        console.log('before ismatch', password, user.password)
        // Check if the password is correct
        const isMatch = await isValidPassword(password, user.password)
        console.log('match is', isMatch)
        // If not, handle it
        if (!isMatch) {
          return done(null, false)
        }

        // Otherwise, return the user
        done(null, user)
      } catch (error) {
        console.error(error)
        done(error, false)
      }
    }
  )
)

async function isValidPassword(newPassword, hashedPassword) {
  return await bcrypt.compare(newPassword, hashedPassword)
}

export default passport
