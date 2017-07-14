const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLFloat,
  GraphQLInt
} = require('graphql')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Game',
    fields: {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      code: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString
      },
      updatedAt: {
        type: GraphQLString
      }
    }
  }),

  Input: new GraphQLInputObjectType({
    name: 'GameInput',
    fields: {
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    }
  })
}