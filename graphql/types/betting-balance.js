const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = require('graphql')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'BettingBalance',
    fields: {
      min: {
        type: GraphQLInt
      },
      max: {
        type: GraphQLInt
      }
    }
  })
}