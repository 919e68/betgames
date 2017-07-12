const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
} = require('graphql')

const db = require('../../models/db')
const Odd = require('../types/odd')

module.exports = {
  Query: {
    odds: {
      type: new GraphQLList(Odd.Type),
      resolve: (root, { id }, { session }) => {
        return new Promise((resolve, reject) => {
          db.Odd.findAll({ limit: 5 }).then(odds => {
            resolve(odds)
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  },

  Mutation: {
   
  }
}