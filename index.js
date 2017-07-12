const path = require('path')
const config = require('./config/server')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const router = express.Router()

const graphQLHTTP = require('express-graphql')

const cors = require('cors')
const sessionConfig = require('./config/session')

const schema = require('./graphql/schema')
const routes = require('./routes/routes.js')

const PORT = process.env.PORT ? process.env.PORT : config.port

let app = express()
app.use(cors())
app.use(session(sessionConfig))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use('/graphql', graphQLHTTP(req => ({ 
  schema: schema, 
  pretty: true, 
  graphiql: true,
  rootValue: req.session
})))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`app started http://localhost:${PORT}`)
})


