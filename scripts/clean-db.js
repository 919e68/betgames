const db = require('../models/db')

db.Draw.destroy({
  where: {},
  truncate: false
})
db.Odd.destroy({
  where: {},
  truncate: false
})
db.Bet.destroy({
  where: {},
  truncate: false
})
