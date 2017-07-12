const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLFloat 
} = require('graphql')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'BetType',
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
    name: 'BetTypeInput',
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