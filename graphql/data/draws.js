const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
  
} = require('graphql')

const db = require('../../models/db')
const Error = require('../types/error')
const Draw = require('../types/draw')

module.exports = {
  Query: {
    latestDraw: {
      type: new GraphQLObjectType({
        name: 'LatestDrawResponse',
        fields: {
          draw: {
            type: Draw.Type
          },
          errors: {
            type: new GraphQLList(Error.Type)
          }
        }
      }),
      args: { 
        gameId: { 
          name: 'gameId', 
          type: GraphQLInt
        }
      },
      resolve: (root, { gameId }) => {
        return new Promise((resolve, reject) => {
          let errors = []

          if (!gameId) {
            errors.push({
              key: 'gameId',
              msg: 'game id is required'
            })
          }

          if (errors.length == 0) {
            db.Draw.findOne({
              where: {
                gameId: gameId
              },
              order: [
                ['id', 'DESC']
              ],
              logging: false
            }).then(draw => {
              resolve({ draw })
            })
          } else {
            resolve({ errors })
          } 
        })
      }
    }
  }
}