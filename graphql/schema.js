const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql')

const users = require('./data/users')
const games = require('./data/games')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      auth: users.Query.auth,
      games: games.Query.games
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      login: users.Mutation.login
    }
  })

})
