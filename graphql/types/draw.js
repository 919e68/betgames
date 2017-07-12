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
    name: 'Draw',
    fields: {
      id: {
        type: GraphQLID
      },
      gameId: {
        type: GraphQLID
      },
      gamePartId: {
        type: GraphQLID
      },
      drawNumber: {
        type: GraphQLString
      },
      winner: {
        type: GraphQLString
      },
      winningNumber: {
        type: GraphQLInt
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
    name: 'DrawInput',
    fields: {
      gameId: {
        type: GraphQLID
      },
      gamePartId: {
        type: GraphQLID
      },
      drawNumber: {
        type: GraphQLString
      },
      winner: {
        type: GraphQLString
      },
      winningNumber: {
        type: GraphQLInt
      }
    }
  })
}