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
    name: 'Outcome',
    fields: {
      id: {
        type: GraphQLID
      },
      betTypeId: {
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
    name: 'OutcomeInput',
    fields: {
      betTypeId: {
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