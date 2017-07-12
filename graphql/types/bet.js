const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLFloat 
} = require('graphql')

const db = require('../../models/db')
const Odd = require('./odd')

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
      userId: {
        type: GraphQLID
      },
      oddId: {
        type: GraphQLID
      },
      odd: {
        type: Odd.Type,
        resolve: (bet) => {
          return new Promise((resolve, reject) => {
            db.Odd.findOne({
              where: {
                id: bet.oddId
              }
            }).then(odd => {

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