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
const Game = require('./game')

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
      game: {
        type: Game.Type,
        resolve: (draw) => {
          return new Promise((resolve, reject) => {
            db.Game.findById(draw.gameId).then(game => {
              resolve(game)
            }).catch(err => {
              reject(err)
            })
          })
        }
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
      latestOdds: {
        type: new GraphQLList(Odd.Type),
        resolve: (draw) => {
          return new Promise((resolve, reject) => {
            db.sequelize.query('SELECT MAX(gamePartId) as gamePartId FROM Odds WHERE drawNumber = :drawNumber', { 
              replacements: {
                drawNumber: draw.drawNumber
              },
              type: db.sequelize.QueryTypes.SELECT,
              logging: false
            }).then(data => {
              if (data.length > 0) {
                db.Odd.findAll({
                  where: {
                    drawNumber: draw.drawNumber,
                    gamePartId: data[0].gamePartId
                  },
                  logging: false
                }).then(odds => {
                  resolve(odds)

                }).catch(err => {
                  reject(err)
                })

              } else {
                resolve(null)
              }
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