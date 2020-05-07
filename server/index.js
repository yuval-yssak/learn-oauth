import app from './app.js'
import { connect } from './mongoClient.js'
import { init } from './dao/users.js'

async function startup() {
  const port = process.env.PORT || 5000

  try {
    // Connect to MongoDB
    const DBclient = await connect()
    await init(DBclient)
    // Start Server
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  } catch (e) {
    console.error(e)
  }
}
startup()
