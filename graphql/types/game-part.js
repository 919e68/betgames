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
    name: 'GamePart',
    fields: {
      id: {
        type: GraphQLID
      },
      gameId: {
        type: GraphQLID
      },
      name: {
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
    name: 'GamePartInput',
    fields: {
      gameId: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    }
  })
}