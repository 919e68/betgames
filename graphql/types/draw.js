const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList

} = require('graphql')

const db = require('../../models/db')
const Odd = require('./odd')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Draw',
    fields: () => ({
      id: {
        type: GraphQLID
      },
      gameId: {
        type: GraphQLID
      },
      gamePartId: {
        type: GraphQLID
      },
      drawNumber: {
        type: GraphQLString
      },
      winner: {
        type: GraphQLString
      },
      winningNumber: {
        type: GraphQLString
      },
      winningSymbol: {
        type: GraphQLString
      },
      odds: {
        type: new GraphQLList(Odd.Type),
        args: { 
          gamePartId: { 
            name: 'gamePartId', 
            type: GraphQLInt
          }
        },
        resolve: (draw, { gamePartId }) => {
          return new Promise((resolve, reject) => {

            let where = {
              drawNumber: draw.drawNumber
            }

            if (gamePartId) {
              where.gamePartId = gamePartId
            }

            db.Odd.findAll({
              where: where,
              logging: false
            }).then(odds => {

              resolve(odds)

            })
          })
        }
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
    name: 'DrawInput',
    fields: {
      gameId: {
        type: GraphQLID
      },
      gamePartId: {
        type: GraphQLID
      },
      drawNumber: {
        type: GraphQLString
      },
      winner: {
        type: GraphQLString
      },
      winningNumber: {
        type: GraphQLInt
      }
    }
  })
}