const process = require('child_process')
const zlib = require('zlib')
const db = require('../models/db')
const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 7000 })
 
// Broadcast to all. 
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

let spawn = process.spawn
let warOfBets = spawn('phantomjs', ['services/war-of-bets-phantom.js'])


warOfBets.stdout.on('data', function (data) {
  let datas = data.toString().split("\r\n")

  for (let i = 0; i < datas.length - 1; i++) {
    let json = JSON.parse(datas[i].toString())

    if (json.type == 'create') {


      // draw table
      if (json.table == 'draw') {
        console.log(`insert on draw table`)

        db.Draw.create({
          drawNumber: json.data.drawNumber,
          gameId: 3
        }, {
          logging: false
        }).then(draw => {

          console.log(`success inserting draw (${json.data.drawNumber})`)

        })

      } else if (json.table == 'odd') {

        db.Odd.bulkCreate([
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 10,
            odds: !isNaN(json.data.odds.dealer) ? json.data.odds.dealer : null
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 11,
            odds: !isNaN(json.data.odds.player) ? json.data.odds.player : null
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 12,
            odds: !isNaN(json.data.odds.war) ? json.data.odds.war : null
          }
        ], {
          logging: false
        }).then(data => {

          console.log(`success inserting (${data.length}) odds for draw (${json.data.drawNumber}) game part (${json.data.gamePartId})`)
          wss.broadcast(JSON.stringify(json))


        }).catch(err => {

          console.log(err)

        })
          

      }


    } else if (json.type == 'winner') {

      db.Draw.update({
        winner: json.data.winner,
        winningNumber: json.data.winningNumber,
        winningSymbol: json.data.winningSymbol
      }, {
        where: {
          drawNumber: json.data.drawNumber
        },
        logging: false
      }).then(draw => {

        
        if (draw) {

          // send winning data to websocket client
          console.log(`draw (${json.data.drawNumber}) updated`)
          wss.broadcast(JSON.stringify(json))


          // update winner and loser odds
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

          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 0 WHERE Odds.outcomeId != :outcomeId', { 
            replacements: {
              outcomeId: outcomeId
            },
            type: db.sequelize.QueryTypes.UPDATE,
            logging: false
          })


          // update winners
          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 1 WHERE Odds.outcomeId = :outcomeId', { 
            replacements: {
              outcomeId: outcomeId
            },
            type: db.sequelize.QueryTypes.UPDATE,
            logging: false
          })

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
                attributes: ['id', 'odds'],
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
        }


      }).catch(err => {

        console.log(err)

      })

    } else {

      console.log(JSON.stringify(json, null, 2))
      wss.broadcast(JSON.stringify(json))
    }
  }
  
})