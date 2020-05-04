import { init, createUser, findUser } from '../dao/users.js'

async function signUp(req, res, next) {
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
  console.log('created', createResult.result)

  // Respond with token
  res.json({ user: 'created' })

  res.status(200).json({ result: 'success' })
}

async function signIn(req, res, next) {
  // generate token
  console.log('called signIn')
}

export { signIn, signUp }
