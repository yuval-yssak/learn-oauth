import app from './app.js'
import { connect } from './mongoClient.js'

async function startup() {
  const port = process.env.PORT || 5000

  try {
    // Connect to MongoDB
    await connect()

    // Start Server
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  } catch (e) {
    console.error(e)
  }
}
startup()
