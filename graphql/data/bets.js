const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql')

const db = require('../../models/db')
const Error = require('../types/error')
const Bet = require('../types/bet')
const BettingBalance = require('../types/betting-balance')

module.exports = {
  Query: {
    recentBets: {
      type: new GraphQLList(Bet.Type),
      args: { 
        userId: { 
          name: 'userId', 
          type: GraphQLInt
        },
        gameId: {
          name: 'gameId',
          type: GraphQLInt
        }
      },
      resolve: (root, { userId, gameId }) => {
        return new Promise((resolve, reject) => {
          let errors = []

          if (!userId)
            reject('userId required')

          db.Bet.findAll({
            
            where: {
              userId: userId
            },
            order: [
              ['updatedAt', 'DESC']
            ],
            limit: 10,
            // logging: false
          }).then(bets => {

            resolve(bets)
    
          }).catch(err => {

            reject(err)

          })

        })
      }
    },

    bettingBalance: {
      type: BettingBalance.Type,
      args: {
        userId: {
          name: 'userId',
          type: GraphQLID
        },
        drawNumber: { 
          name: 'drawNumber', 
          type: GraphQLID
        },
        outcomeId: {
          name: 'outcomeId',
          type: GraphQLID
        }
      },
      resolve: (root, { userId, drawNumber, outcomeId }) => {
        return new Promise((resolve, reject) => {
          let errors = []
         
          if (errors.length == 0) {
            db.sequelize.query('SELECT ISNULL(SUM(Bets.amount), 0) AS totalBet FROM Bets LEFT JOIN Odds ON Bets.oddId = Odds.id WHERE Bets.userId = :userId AND Bets.drawNumber = :drawNumber AND Odds.outcomeId = :outcomeId', {
              type: db.sequelize.QueryTypes.SELECT,
              replacements: {
                userId: userId,
                drawNumber: drawNumber,
                outcomeId: outcomeId
              }
            }).then(data => {
              db.Setting.findOne({
                where: {
                  key: 'max-bet'
                }
              }).then(maxBet => {
          
                let min = data[0].totalBet >= 50? 0 : 1
                let max = parseInt(maxBet.value) - data[0].totalBet
     
                resolve({
                  min: min,
                  max: max
                })
              })

            })
          }
        })
      }
    }
  },

  Mutation: {
    createBet: {
      type: new GraphQLObjectType({
        name: 'BetResponse',
        fields: {
          bet: {
            type: Bet.Type
          },
          errors: {
            type: new GraphQLList(Error.Type)
          }
        }
      }),
      args: { 
        data: { 
          name: 'data', 
          type: Bet.Input
        }
      },
      resolve: (root, { data }, req) => {
        return new Promise((resolve, reject) => {

          let errors = []

          if (!data.drawNumber) {
            errors.push({
              key: 'drawNumber',
              msg: 'draw number is required'
            })

          } else if (!data.userId) {
            errors.push({
              key: 'userId',
              msg: 'user id is required'
            })

          } else if (!data.oddId) {
            errors.push({
              key: 'oddId',
              msg: 'odd id is required'
            })
          } else if (!data.amount) {
            errors.push({
              key: 'amount',
              msg: 'amount is required'
            })
          }

          if (errors.length == 0) {
            db.Bet.create(data, { logging: true }).then(bet => {
              if (bet) {
                db.User.find({
                  where: {
                    id: data.userId
                  }
                }).then(user => {
                  if (user) {
                    user.update({ currentBalance: (user.currentBalance - data.amount) })
                  }

                  resolve({ bet, errors })
                }).catch(err => {
                  reject(err)
                })
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            resolve({ errors })
          }

        })
      }
    }

  }
}