const db = require('../models/index')


var json = {
  type: 'winner',
  data: {
    drawNumber: 81707101201,
    winner: 'war',
    winningNumber: 11,
    winningSymbol: 'spades'
  }
}

/*
  outcomes ids
    dealer = 10
    player = 11
    war    = 12
*/

let outcomeId = null

if (json.data.winner == 'dealer') {
  outcomeId = 10

} else if (json.data.winner == 'player') {
  outcomeId = 11

} else if (json.data.winner == 'war') {
  outcomeId = 12
}


// update losers
db.sequelize.query('UPDATE Bets SET Bets.isWinner = 0 FROM Bets INNER JOIN Odds ON Odds.id = Bets.oddId WHERE Odds.outcomeId != :outcomeId', { 
  replacements: {
    outcomeId: outcomeId
  },
  type: db.sequelize.QueryTypes.UPDATE,
  logging: false
})


// update winners
db.Bet.findAll({
  where: {
    drawNumber: json.data.drawNumber
  },
  include: [
    {
      model: db.User,
      attributes: ['id', 'currentBalance']
    },
    {
      model: db.Odd,
      attributes: ['outcomeId', 'odds'],
      where: {
        outcomeId: outcomeId
      }
    }
  ],
  logging: false
}).then(bets => {

  for (let i = 0; i < bets.length; i++) {
    (function(i) {

      let computedBalance = bets[i].User.currentBalance + (bets[i].amount * bets[i].Odd.odds)

      bets[i].update({ isWinner: true }, { logging: false })
      bets[i].User.update({ currentBalance: computedBalance }, { logging: false })

    })(i)
  }
  
})