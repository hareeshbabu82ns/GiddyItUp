const userResolvers = require( './users' )
const childResolvers = require( './child' )
const parentResolvers = require( './parent' )

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...childResolvers.Query,
    ...parentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...childResolvers.Mutation,
    ...parentResolvers.Mutation,
  }
}

module.exports = resolvers