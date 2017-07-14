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



let war = spawn('phantomjs', ['services/war-phantom.js'])
war.stdout.on('data', function (data) {
  let datas = data.toString().split("\r\n")

  for (let i = 0; i < datas.length - 1; i++) {
    let json = JSON.parse(datas[i].toString())
    json.game = 'war'

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

          db.Odd.findAll({
            where: {
              drawNumber: json.data.drawNumber,
              gamePartId: json.data.gamePartId
            },
            logging: false
          }).then(odds => {

            let oddsData = {}

            for (let i = 0; i < odds.length; i++) {
              if (odds[i].outcomeId == 10) {
                oddsData.dealer = {
                  id: odds[i].id,
                  odds: odds[i].odds
                }

              } else if (odds[i].outcomeId == 11) {
                oddsData.player = {
                  id: odds[i].id,
                  odds: odds[i].odds
                }

              } else if (odds[i].outcomeId == 12) {
                oddsData.war = {
                  id: odds[i].id,
                  odds: odds[i].odds
                }
              }
            }

            console.log(`success inserting (${data.length}) odds for draw (${json.data.drawNumber}) game part (${json.data.gamePartId})`)

            wss.broadcast(JSON.stringify({
              type: 'create',
              table: 'odd',
              game: 'war',
              data: {
                drawNumber: json.data.drawNumber,
                gamePartId: json.data.gamePartId,
                odds: oddsData
              }
            }))

          })

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
          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 0 WHERE Odds.outcomeId != :outcomeId AND Odds.drawNumber = :drawNumber', { 
            replacements: {
              outcomeId: outcomeId,
              drawNumber: json.data.drawNumber
            },
            type: db.sequelize.QueryTypes.UPDATE,
            logging: false
          })


          // update winners
          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 1 WHERE Odds.outcomeId = :outcomeId AND Odds.drawNumber = :drawNumber', { 
            replacements: {
              outcomeId: outcomeId,
              drawNumber: json.data.drawNumber
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





// poker
let poker = spawn('phantomjs', ['services/poker-phantom.js'])
poker.stdout.on('data', function (data) {
  let datas = data.toString().split("\r\n")

  for (let i = 0; i < datas.length - 1; i++) {
    let json = JSON.parse(datas[i].toString())
    json.game = 'poker'

    if (json.type == 'create') {


      // draw table
      if (json.table == 'draw') {
        console.log(`insert on draw table`)

        db.Draw.create({
          drawNumber: json.data.drawNumber,
          gameId: 1
        }, {
          logging: false
        }).then(draw => {
          console.log(`success inserting draw (${json.data.drawNumber})`)
        })

      } else if (json.table == 'odd') {

        console.log(JSON.stringify(json, null, 2))

        db.Odd.bulkCreate([
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 1,
            odds: !isNaN(json.data.odds.hand_1.odds) ? json.data.odds.hand_1.odds : null,
            params: JSON.stringify(json.data.odds.hand_1)
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 2,
            odds: !isNaN(json.data.odds.hand_2.odds) ? json.data.odds.hand_2.odds : null,
            params: JSON.stringify(json.data.odds.hand_2)
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 3,
            odds: !isNaN(json.data.odds.hand_3.odds) ? json.data.odds.hand_3.odds : null,
            params: JSON.stringify(json.data.odds.hand_3)
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 4,
            odds: !isNaN(json.data.odds.hand_4.odds) ? json.data.odds.hand_4.odds : null,
            params: JSON.stringify(json.data.odds.hand_4)
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 5,
            odds: !isNaN(json.data.odds.hand_5.odds) ? json.data.odds.hand_5.odds : null,
            params: JSON.stringify(json.data.odds.hand_5)
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 6,
            odds: !isNaN(json.data.odds.hand_6.odds) ? json.data.odds.hand_6.odds : null,
            params: JSON.stringify(json.data.odds.hand_6)
          }
        ], {
          logging: false
        }).then(data => {

          db.Odd.findAll({
            where: {
              drawNumber: json.data.drawNumber,
              gamePartId: json.data.gamePartId
            },
            logging: false
          }).then(odds => {

            let oddsData = {}

            for (let i = 0; i < odds.length; i++) {
              if (odds[i].outcomeId == 1) {
                oddsData.hand_1 = {
                  id: odds[i].id,
                  params: JSON.parse(odds[i].params),
                  odds: odds[i].odds
                }

              } else if (odds[i].outcomeId == 2) {
                oddsData.hand_2 = {
                  id: odds[i].id,
                  params: JSON.parse(odds[i].params),
                  odds: odds[i].odds
                }

              } else if (odds[i].outcomeId == 3) {
                oddsData.hand_3 = {
                  id: odds[i].id,
                  params: JSON.parse(odds[i].params),
                  odds: odds[i].odds
                }
              } else if (odds[i].outcomeId == 4) {
                oddsData.hand_4 = {
                  id: odds[i].id,
                  params: JSON.parse(odds[i].params),
                  odds: odds[i].odds
                }
              } else if (odds[i].outcomeId == 5) {
                oddsData.hand_5 = {
                  id: odds[i].id,
                  params: JSON.parse(odds[i].params),
                  odds: odds[i].odds
                }
              } else if (odds[i].outcomeId == 6) {
                oddsData.hand_6= {
                  id: odds[i].id,
                  params: JSON.parse(odds[i].params),
                  odds: odds[i].odds
                }
              }
            }

            console.log(`success inserting (${data.length}) odds for draw (${json.data.drawNumber}) game part (${json.data.gamePartId})`)

            wss.broadcast(JSON.stringify({
              type: 'create',
              table: 'odd',
              game: 'poker',
              test: true,
              data: {
                drawNumber: json.data.drawNumber,
                gamePartId: json.data.gamePartId,
                odds: oddsData
              }
            }))

          }).catch(err => {
            console.log(err)
          })
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
          let winningOutcomeId = {
            hand_1: 1,
            hand_2: 2,
            hand_3: 3,
            hand_4: 4,
            hand_5: 5
          }

          let outcomeId = winningOutcomeId[json.data.winner]

          console.log(json.data.winner)

          // update losers
          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 0 WHERE Odds.outcomeId != :outcomeId AND Odds.drawNumber = :drawNumber', { 
            replacements: {
              outcomeId: outcomeId,
              drawNumber: json.data.drawNumber
            },
            type: db.sequelize.QueryTypes.UPDATE,
            logging: false
          })


          // update winners
          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 1 WHERE Odds.outcomeId = :outcomeId AND Odds.drawNumber = :drawNumber', { 
            replacements: {
              outcomeId: outcomeId,
              drawNumber: json.data.drawNumber
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





let baccarat = spawn('phantomjs', ['services/baccarat-phantom.js'])
baccarat.stdout.on('data', function (data) {
  let datas = data.toString().split("\r\n")

  for (let i = 0; i < datas.length - 1; i++) {
    let json = JSON.parse(datas[i].toString())
    json.game = 'baccarat'

    if (json.type == 'create') {


      // draw table
      if (json.table == 'draw') {
        console.log(`insert on draw table`)

        db.Draw.create({
          drawNumber: json.data.drawNumber,
          gameId: 2
        }, {
          logging: false
        }).then(draw => {
          console.log(`success inserting draw (${json.data.drawNumber})`)
        })

      } else if (json.table == 'odd') {

        console.log(JSON.stringify(json, null, 2))

        db.Odd.bulkCreate([
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 7,
            odds: !isNaN(json.data.odds.player.odds) ? json.data.odds.player.odds : null
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 8,
            odds: !isNaN(json.data.odds.banker.odds) ? json.data.odds.banker.odds : null
          },
          {
            drawNumber: json.data.drawNumber,
            gamePartId: json.data.gamePartId,
            outcomeId: 9,
            odds: !isNaN(json.data.odds.tie.odds) ? json.data.odds.tie.odds : null
          }
        ], {
          logging: false
        }).then(data => {

          db.Odd.findAll({
            where: {
              drawNumber: json.data.drawNumber,
              gamePartId: json.data.gamePartId
            },
            logging: false
          }).then(odds => {

            let oddsData = {}

            for (let i = 0; i < odds.length; i++) {
              if (odds[i].outcomeId == 7) {
                oddsData.player = {
                  id: odds[i].id,
                  odds: odds[i].odds
                }

              } else if (odds[i].outcomeId == 8) {
                oddsData.banker = {
                  id: odds[i].id,
                  odds: odds[i].odds
                }

              } else if (odds[i].outcomeId == 9) {
                oddsData.tie = {
                  id: odds[i].id,
                  odds: odds[i].odds
                }
              }
            }

            console.log(`success inserting (${data.length}) odds for draw (${json.data.drawNumber}) game part (${json.data.gamePartId})`)

            wss.broadcast(JSON.stringify({
              type: 'create',
              table: 'odd',
              game: 'baccarat',
              test: true,
              data: {
                drawNumber: json.data.drawNumber,
                gamePartId: json.data.gamePartId,
                odds: oddsData
              }
            }))

          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      }


    } else if (json.type == 'winner') {
      console.log(JSON.stringify(json))
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
          let winningOutcomeId = {
            player: 7,
            banker: 8,
            tie: 9
          }

          let outcomeId = winningOutcomeId[json.data.winner]

          console.log(json.data.winner)

          // update losers
          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 0 WHERE Odds.outcomeId != :outcomeId AND Odds.drawNumber = :drawNumber', { 
            replacements: {
              outcomeId: outcomeId,
              drawNumber: json.data.drawNumber
            },
            type: db.sequelize.QueryTypes.UPDATE,
            logging: false
          })


          // update winners
          db.sequelize.query('UPDATE Odds SET Odds.isWinner = 1 WHERE Odds.outcomeId = :outcomeId AND Odds.drawNumber = :drawNumber', { 
            replacements: {
              outcomeId: outcomeId,
              drawNumber: json.data.drawNumber
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