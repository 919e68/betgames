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
const Bet = require('./bet')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'User',
    fields: {
      id: {
        type: GraphQLID
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      currentBalance: {
        type: GraphQLFloat
      },
      bets: {
        type: new GraphQLList(Bet.Type),
        resolve: (bet) => {
          return new Promise((resolve, reject) => {
            db.User.findAll({
              where: {
                
              }
            }).then(user => {
              resolve(user)
            }).catch(err => {
              reject(err)
            })
          })
        }
      },
      createdAt: {
        type: GraphQLString
      },
      updatedAt: {
        type: GraphQLString
      },

    }
  }),

  Input: new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
    }
  })
}