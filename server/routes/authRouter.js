import expressPromise from 'express-promise-router'
import passport from 'passport'

import passportConfig from '../passport.js'
import { validateBody, schemas } from '../helpers/routeHelpers.js'
import { signIn, signUp, secret } from '../controllers/users.js'

const router = expressPromise()

function logRoute(req, res, next) {
  console.log(req.body)
}

router.post('/signup', validateBody(schemas.authSchema), signUp)

router.post('/signin', logRoute)

router.get('/signout', logRoute)

router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  secret
)

export default router
