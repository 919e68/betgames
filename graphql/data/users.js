const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql')

const db = require('../../models/db')
const Error = require('../types/error')
const User = require('../types/user')

module.exports = {
  Query: {
    auth: {
      type: new GraphQLObjectType({
        name: 'AuthResponse',
        fields: {
          user: {
            type: User.Type
          },
          errors: {
            type: new GraphQLList(Error.Type)
          }
        }
      }),
      resolve: (root, { data }, req) => {
        return new Promise((resolve, reject) => {
          console.log(req.session.user)
          if (req.session.user) {
            resolve({ 
              user: {
                id: 1,
                username: 'shet'
              }
            })
          } else {
            resolve({
              errors: [
                {
                  key: 'shet',
                  msg: 'settt'
                }
              ]
            })
          }
        })
      }
    }
  },

  Mutation: {
    login: {
      type: new GraphQLObjectType({
        name: 'LoginResponse',
        fields: {
          user: {
            type: User.Type
          },
          errors: {
            type: new GraphQLList(Error.Type)
          }
        }
      }),
      args: { 
        data: { 
          name: 'data', 
          type: User.Input
        }
      },
      resolve: (root, { data }, req) => {
        return new Promise((resolve, reject) => {
          db.User.findOne({
            where: {
              username: data.username,
              password: data.password
            },
            logging: false
          }).then(user => {
            let errors = []
            if (!user) {
              errors.push({ key: 'login', msg: 'invalid login' })
            }

            if (errors.length == 0) {
              req.session.user = user
              resolve({ user, errors })

            } else {
              resolve({ errors })
            }

          })
        })
      }
    }

  }
}