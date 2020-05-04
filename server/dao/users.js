let users

async function init(client, dbName) {
  await client.db(dbName).createCollection('users')
  users = await client.db(dbName).collection('users')
}

async function findUser(filter) {
  return await users.findOne(filter)
}

async function createUser(email, password) {
  return await users.insertOne({ email, password })
}

async function destroy() {
  if (process.env.NODE_ENV !== 'test')
    throw new Error('will not destoy collection on non-test environment')
  return await users.drop()
}

export { init, findUser, createUser, destroy }
