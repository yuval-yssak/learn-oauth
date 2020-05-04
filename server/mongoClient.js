import MongoDB from 'mongodb'

import { DBUrl } from './config.js'

const { MongoClient } = MongoDB

async function connect() {
  const client = new MongoClient(DBUrl + '?serverSelectionTimeoutMS=5000', {
    useUnifiedTopology: true
  })
  await client.connect()
  console.log('Connected successfully to server ', DBUrl)
  return client
}

async function disconnect(client) {
  await client.close()
}

export { connect, disconnect }
