import bcrypt from 'bcryptjs'

let users

async function init(client, dbName) {
  await client.db(dbName).createCollection('users')
  users = await client.db(dbName).collection('users')
}

async function findUser(filter) {
  return await users.findOne(filter)
}

async function createUser(email, password) {
  // Generate a salt
  const salt = await bcrypt.genSalt(10)

  // Generate a password hash (salt + hash)
  const passwordHash = await bcrypt.hash(password, salt)

  return await users.insertOne({
    method: 'local',
    local: { email, password: passwordHash }
  })
}

async function createGoogleUser(id) {
  return await users.insertOne({ method: 'google', google: { id } })
}
async function destroy() {
  if (process.env.NODE_ENV !== 'test')
    throw new Error('will not destoy collection on non-test environment')
  return await users.drop()
}

export { init, findUser, createUser, createGoogleUser, destroy }
