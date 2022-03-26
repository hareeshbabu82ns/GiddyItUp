const userResolvers = require( './users' )
const childResolvers = require( './child' )
const parentResolvers = require( './parent' )
const taskResolvers = require( './task' )

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...childResolvers.Query,
    ...parentResolvers.Query,
    ...taskResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...childResolvers.Mutation,
    ...parentResolvers.Mutation,
    ...taskResolvers.Mutation,
  }
}

module.exports = resolvers