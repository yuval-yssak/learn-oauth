import express from 'express'
import bodyParser from 'body-parser'

import authRouter from './routes/authRouter.js'

const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes
app.use('/auth', authRouter)

// Start Server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))
