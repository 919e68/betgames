const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLBoolean,
  GraphQLFloat 
} = require('graphql')

const db = require('../../models/db')
const Odd = require('./odd')
const Draw = require('./draw')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Bet',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      drawNumber: {
        type: GraphQLID
      },
      draw: {
        type: Draw.Type,
        resolve: (bet) => {
          return new Promise((resolve, reject) => {
            db.Draw.findOne({
              where: {
                drawNumber: bet.drawNumber
              },
              logging: false
            }).then(draw => {
              resolve(draw)
            }).catch(err => {
              reject(err)
            })
          })
        }
      },
      userId: {
        type: GraphQLID
      },
      // user: {
      //   type: User.Type,
      //   resolve: (bet) => {
      //     return new Promise((resolve, reject) => {
      //       db.User.findById(bet.userId).then(user => {
      //         resolve(user)
      //       }).catch(err => {
      //         reject(err)
      //       })
      //     })
      //   }
      // },
      oddId: {
        type: GraphQLID
      },
      odd: {
        type: Odd.Type,
        resolve: (bet) => {
          return new Promise((resolve, reject) => {
            db.Odd.findById(bet.oddId).then(odd => {
              resolve(odd)
            }).catch(err => {
              reject(err)
            })
          })
        }
      },
      amount: {
        type: GraphQLFloat
      },
      isWinner: {
        type: GraphQLBoolean
      },
      createdAt: {
        type: GraphQLString
      },
      updatedAt: {
        type: GraphQLString
      }
    })
  }),

  Input: new GraphQLInputObjectType({
    name: 'BetInput',
    fields: {
      drawNumber: {
        type: GraphQLString
      },
      userId: {
        type: GraphQLString
      },
      oddId: {
        type: GraphQLString
      },
      amount: {
        type: GraphQLFloat
      }
    }
  })
}