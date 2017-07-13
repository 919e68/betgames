const fs = require('fs')
const db = require('../models/db')

const user = require('../graphql/types/user')


db.User.findAll({
  limit: 10
})