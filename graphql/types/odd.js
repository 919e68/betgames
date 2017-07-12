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
    name: 'Odd',
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
      outcomeId: {
        type: GraphQLID
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
    name: 'OddInput',
    fields: {
      gameId: {
        type: GraphQLID
      },
      gamePartId: {
        type: GraphQLID
      },
      outcomeId: {
        type: GraphQLID
      }
    }
  })
}