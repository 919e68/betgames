const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} = require('graphql')

const db = require('../../models/db')
const Error = require('../types/error')
const Bet = require('../types/bet')

module.exports = {

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
            db.Bet.create(data, { logging: false }).then(bet => {
              if (bet) {
                resolve({ bet, errors })
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