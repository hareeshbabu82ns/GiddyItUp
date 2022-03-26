const userResolvers = require( './users' )
const childResolvers = require( './child' )

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...childResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...childResolvers.Mutation,
  }
}

module.exports = resolvers