const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const moment = require('moment')

const db = require('../../models/db')
const Error = require('../types/error')
const Draw = require('../types/draw')
const Pagination = require('../types/pagination')

module.exports = {
  Query: {
    draws: {
      type: new GraphQLObjectType({
        name: 'DrawsResponse',
        fields: () => ({
          data: {
            type: new GraphQLList(Draw.Type)
          },
          errors: {
            type: new GraphQLList(Error.Type)
          },
          pagination: {
            type: Pagination.Type
          }
        })
      }),
      args: {
        gameId: {
          name: 'gameId',
          type: GraphQLInt
        },
        date: {
          name: 'date',
          type: GraphQLString
        },
        drawNumber: {
          name: 'drawNumber',
          type: GraphQLString
        },
        page: {
          name: 'page',
          type: GraphQLInt
        },
        limit: {
          name: 'limit',
          type: GraphQLInt
        }
      },
      resolve: (root, { gameId, date, drawNumber, page, limit }) => {
        return new Promise((resolve, reject) => {
          if (!page) {
            page = 1
          }

          if (!limit) {
            limit = 30
          }

          let where = {
            winner: {
              $ne: null
            }
          }

          if (gameId) {
            where.gameId = gameId
          }

          if (date) {
            where.updatedAt = {
              $gte: moment(date).startOf('day'),
              $lte: moment(date).endOf('day')
            }
          }

          if (drawNumber) {
            where.drawNumber = drawNumber
          }

          db.Draw.count({
            where: where
          }).then(count => {

            let pageCount = Math.ceil(count/limit)
            let pagination = {
              page: page,
              pageCount: pageCount,
              count: count,
              prev: page > 1? true : false,
              next: page < pageCount? true : false
            }

            db.Draw.findAll({
              where: where,
              order: [
                ['id', 'DESC']
              ],
              offset: (page - 1) * limit,
              limit: limit,
            }).then(data => {
              resolve({ data, pagination })
            }).catch(err => {
              reject(err)
            })

          })

        })
      }
    },
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