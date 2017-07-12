const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLFloat,
  GraphQLInt
} = require('graphql')

const db = require('../../models/db')
const BetType = require('./bet-type')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Outcome',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      betTypeId: {
        type: GraphQLID
      },
      betType: {
        type: BetType.Type,
        resolve: (outcome) => {
          return new Promise((resolve, reject) => {
            db.BetType.findById(outcome.betTypeId).then(betType => {
              resolve(betType)
            }).catch(err => {
              reject(err)
            })
          })
        }
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
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
    name: 'OutcomeInput',
    fields: {
      betTypeId: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    }
  })
}