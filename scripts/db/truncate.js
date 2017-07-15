const db = require('../../models/db')

db.Game.destroy({
  where: {},
  truncate: true
})
db.GamePart.destroy({
  where: {},
  truncate: true
})
db.BetType.destroy({
  where: {},
  truncate: true
})
db.Outcome.destroy({
  where: {},
  truncate: true
})
db.Draw.destroy({
  where: {},
  truncate: true
})
db.Odd.destroy({
  where: {},
  truncate: true
})
db.Bet.destroy({
  where: {},
  truncate: true
})
db.Translator.destroy({
  where: {},
  truncate: true
})
db.User.destroy({
  where: {},
  truncate: true
})

