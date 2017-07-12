const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLFloat 
} = require('graphql')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Error',
    fields: {
      key: {
        type: GraphQLString
      },
      msg: {
        type: GraphQLString
      }
    }
  })
}