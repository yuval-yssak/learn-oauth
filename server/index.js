import app from './app.js'

// Start Server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))
