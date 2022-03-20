const { ApolloServer } = require( 'apollo-server-express' );
const { ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
} = require( 'apollo-server-core' );
const http = require( 'http' );
const path = require( 'path' );
const { verifyUserFromRequest } = require( '../controllers/util' );

async function startApolloServer( { expressApp, typeDefs, resolvers,
  port, connection } ) {

  const httpServer = http.createServer( expressApp )

  const server = new ApolloServer( {
    typeDefs,
    resolvers,
    // context: initContext,
    context: async ( { req } ) => {
      // console.log( 'initContext', req.headers )
      const { isLoggedIn, user } = await verifyUserFromRequest( req )
      return {
        connection,
        isLoggedIn,
        authUser: user
      }
    },
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground,
      ApolloServerPluginDrainHttpServer( { httpServer }, ) ],
  } )

  await server.start()
  server.applyMiddleware( { app: expressApp } )
  await new Promise( resolve => httpServer.listen( { port }, resolve ) )
  console.log( `🚀 UI ready at http://localhost:${port}` )
  console.log( `🚀 API running at http://localhost:${port}${server.graphqlPath}` )
  // console.log(`🚀 Server ready at http://${require('os').hostname()}:${port}${server.graphqlPath}`)

  return server
}

module.exports = { startApolloServer }