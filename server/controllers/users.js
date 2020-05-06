import JWT from 'jsonwebtoken'

import { JWT_SECRET } from '../config.js'

import { init, createUser, findUser } from '../dao/users.js'
function signToken(user) {
  return JWT.sign(
    {
      iss: 'sivananda-bahamas',
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    JWT_SECRET
  )
}

async function signUp(req, res, next) {
  try {
    console.log('start signing up', req.body, req.value.body)
    // supposed to receive email and password

    const { email, password } = req.value.body

    // Check if there is a user with the same email
    const foundUser = await findUser({ email })
    console.log('founduser is', email, foundUser)
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' })
    }

    // Create a new user
    const createResult = await createUser(email, password)
    if (createResult.result.n !== 1)
      throw new Error('did not insert one record for ' + req.body)

    const [newUser] = createResult.ops

    // Generate the token
    const token = signToken(newUser)
    console.log('token is issued', token)
    // Respond with token
    res.json({ token })
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function signIn(req, res, next) {
  // generate token
  const token = signToken(req.user)
  console.log('cotroller sign in')
  res.status(200).json({ token })
}

function secret(req, res, next) {
  console.log('am I supposed to give the secret now?')
  res.status(200).json({ secret: 'resource' })
}

export { signIn, signUp, secret }
