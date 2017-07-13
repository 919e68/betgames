const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql')

const db = require('../../models/db')
const Error = require('../types/error')
const Bet = require('../types/bet')

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