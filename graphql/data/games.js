const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql')

const db = require('../../models/db')
const Game = require('../types/game')

module.exports = {
  Query: {
    games: {
      type: new GraphQLList(Game.Type),
      resolve: () => {
        return new Promise((resolve, reject) => {
          db.Game.findAll().then(games => {
            resolve(games)
          })
        })
      }
    }
  }
}