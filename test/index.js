const fs = require('fs')
const db = require('../models/db')

const user = require('../graphql/types/user')


db.Draw.destroy({
  where: {},
  truncate: true
})