import expressPromise from 'express-promise-router'

const router = expressPromise()

function logRoute(req, res, next) {
  console.log(req.body)
}

router.post('/signup', logRoute)

router.post('/signin', logRoute)

router.get('/signout', logRoute)

export default router
