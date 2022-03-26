const userResolvers = require( './users' )
const childResolvers = require( './child' )
const parentResolvers = require( './parent' )
const taskResolvers = require( './task' )
const pointsResolvers = require( './points' )

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...childResolvers.Query,
    ...parentResolvers.Query,
    ...taskResolvers.Query,
    ...pointsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...childResolvers.Mutation,
    ...parentResolvers.Mutation,
    ...taskResolvers.Mutation,
    ...pointsResolvers.Mutation,
  }
}

module.exports = resolvers