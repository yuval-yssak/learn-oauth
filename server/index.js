import app from './app.js'

async function startup() {
  const port = process.env.PORT || 5000

  try {
    // Start Server
    app.listen(port, () => console.log(`Server listening on port ${port}`))
  } catch (e) {
    console.error(e)
  }
}
startup()
