const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString
} = require('graphql')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Pagination',
    fields: () => ({
      page: {
        type: GraphQLInt
      },
      pageCount: {
        type: GraphQLInt
      },
      count: {
        type: GraphQLInt
      },
      prev: {
        type: GraphQLBoolean
      },
      next: {
        type: GraphQLBoolean
      }
    })
  })
}