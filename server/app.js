import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import authRouter from './routes/authRouter.js'

const app = express()

// Middlewares
app.use(bodyParser.json())
app.use(cors())
// Routes
app.use('/auth', authRouter)
app.get('/test', (req, res, next) => {
  console.log('test')
  res.json({ a: 2 })
})
export default app
