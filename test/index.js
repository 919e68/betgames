const fs = require('fs')
const db = require('../models/db')
const moment = require('moment')
const user = require('../graphql/types/user')

db.sequelize.query('SELECT ISNULL(SUM(Bets.amount), 0) AS totalBet FROM Bets LEFT JOIN Odds ON Bets.oddId = Odds.id WHERE Bets.userId = :userId AND Bets.drawNumber = :drawNumber AND Odds.outcomeId = :outcomeId', {
  type: sequelize.QueryTypes.SELECT,
  replacements: {
    userId: 1,
    drawNumber: 10029283123,
    outcomeId: 5
  }
})