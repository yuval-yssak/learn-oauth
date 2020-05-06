import expressPromise from 'express-promise-router'
import passport from 'passport'

import passportConfig from '../passport.js'
import { validateBody, schemas } from '../helpers/routeHelpers.js'
import { signIn, signUp, secret } from '../controllers/users.js'

const passportSignIn = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

const router = expressPromise()

function logRoute(req, res, next) {
  console.log('log route', req.url), next()
}

router.post('/signup', validateBody(schemas.authSchema), signUp)

const schema = schemas.authSchema

router.post('/signin', logRoute, validateBody(schema), passportSignIn, signIn)

router.get('/signout', logRoute)

router.get('/secret', passportJWT, secret)

export default router
