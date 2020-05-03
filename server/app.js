import express from 'express'
import bodyParser from 'body-parser'

import authRouter from './routes/authRouter.js'

const app = express()

// Middlewares
app.use(bodyParser.json())

// Routes
app.use('/auth', authRouter)

export default app
