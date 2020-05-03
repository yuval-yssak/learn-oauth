import expressPromise from 'express-promise-router'

import { validateBody, schemas } from '../helpers/routeHelpers.js'
import { signIn, signUp } from '../controllers/users.js'

const router = expressPromise()

function logRoute(req, res, next) {
  console.log(req.body)
}

router.post('/signup', validateBody(schemas.authSchema), signUp)

router.post('/signin', logRoute)

router.get('/signout', logRoute)

export default router
