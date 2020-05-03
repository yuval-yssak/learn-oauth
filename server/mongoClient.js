import MongoDB from 'mongodb'

import { DBUrl } from './config.js'

const { MongoClient } = MongoDB

export async function connect() {
  const client = new MongoClient(DBUrl + '?serverSelectionTimeoutMS=5000', {
    useUnifiedTopology: true
  })
  await client.connect()

  console.log('Connected successfully to server ', DBUrl)

  return client
}
