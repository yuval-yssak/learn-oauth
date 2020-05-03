async function signUp(req, res, next) {
  // supposed to receive email and password

  res.status(200).json({ result: 'success' })
}

async function signIn(req, res, next) {
  // generate token
  console.log('called signIn')
}

export { signIn, signUp }
