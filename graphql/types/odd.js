const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLInt,
  GraphQLString, 
  GraphQLFloat,
  GraphQLBoolean
  
} = require('graphql')

const db = require('../../models/db')
const Outcome = require('./outcome')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Odd',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      drawNumber: {
        type: GraphQLID
      },
      gamePartId: {
        type: GraphQLID
      },
      outcomeId: {
        type: GraphQLID
      },
      outcome: {
        type: Outcome.Type,
        resolve: (odd) => {
          return new Promise((resolve, reject) => {
            db.Outcome.findById(odd.outcomeId, { logging: false }).then(outcome => {
              resolve(outcome)
            }).catch(err => {
              reject(err)
            })
          })
        }
      },
      odds: {
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
    name: 'OddInput',
    fields: {
      gameId: {
        type: GraphQLID
      },
      gamePartId: {
        type: GraphQLID
      },
      outcomeId: {
        type: GraphQLID
      }
    }
  })
}