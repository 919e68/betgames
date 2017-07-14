const { 
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Card',
    fields: {
      number: {
        type: GraphQLString
      },
      rank: {
        type: GraphQLString
      },
      symbol: {
        type: GraphQLString
      }
    }
  })
}