import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import session from 'express-session'
import https from 'https'
import fs from 'fs'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'

import './env'
import router from './routes'
import authRouter from './routes/auth'
import passport from './passport'
import './database'
import schema from './graphql/'

const app = express()
const PORT = process.env.PORT || 3001

// Protect against vulnerabilities.
app.use(helmet())

// Middleware.
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Compress all routes.
app.use(compression())

// Serving static files/images.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
}
app.use('/static', express.static(path.join(__dirname, 'public')))

// Initialize Passport.
app.use(passport.initialize())
app.use(passport.session())

// GraphQl Server Setup.
app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema,
    rootValue: global,
    graphiql: true,
    context: { user: req.user },
  }))
)

// Routes.
app.use('/auth', authRouter)
app.use('/', router)

// Error handler.
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'There was a problem')
)

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => {
    console.log(`Express App listening on port ${PORT}`)
  })
} else {
  // Options for certification and encryption.
  const options = {
    key: fs.readFileSync('./config/privatekey.pem'),
    cert: fs.readFileSync('./config/certificate.pem'),
    // requestCert :false,
    // rejectUnauthorized: false,
  }

  const server = https.createServer(options, app)
  server.listen(PORT, () => {
    console.log(`Express App listening on port ${PORT}`)
  })
}
