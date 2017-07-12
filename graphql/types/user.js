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
    name: 'User',
    fields: {
      id: {
        type: GraphQLID
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString
      },
      updatedAt: {
        type: GraphQLString
      },
      currentBalance: {
        type: GraphQLFloat
      }
    }
  }),

  Input: new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
    }
  })
}