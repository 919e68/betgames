const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLFloat 
} = require('graphql')

const db = require('../../models/db')
const Game = require('./game')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'BetType',
    fields: {
      id: {
        type: GraphQLID
      },
      gameId: {
        type: GraphQLID
      },
      game: {
        type: Game.Type,
        resolve: (betType) => {
          return new Promise((resolve, reject) => {
            db.Game.findById(betType.gameId).then(game => {
              resolve(game)
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
    }
  }),

  Input: new GraphQLInputObjectType({
    name: 'BetTypeInput',
    fields: {
      gameId: {
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