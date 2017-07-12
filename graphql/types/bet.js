const { 
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLID, 
  GraphQLString, 
  GraphQLFloat 
} = require('graphql')

module.exports = {
  Type: new GraphQLObjectType({
    name: 'Bet',
    fields: {
      id: {
        type: GraphQLID
      },
      drawId: {
        type: GraphQLID
      },
      userId: {
        type: GraphQLID
      },
      oddId: {
        type: GraphQLID
      },
      amount: {
        type: GraphQLFloat
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
    name: 'BetInput',
    fields: {
      drawId: {
        type: GraphQLString
      },
      userId: {
        type: GraphQLString
      },
      oddId: {
        type: GraphQLString
      },
      amount: {
        type: GraphQLFloat
      }
    }
  })
}