require( "dotenv" ).config();
const express = require( "express" );
const mongoose = require( "mongoose" );
const path = require( "path" );
const cookieParser = require( "cookie-parser" );

const PORT = process.env.PORT || 3001;

const app = express();

const ParentController = require( "./controllers/parentController" );
const ChildController = require( "./controllers/childController" );
const TaskController = require( "./controllers/taskController" );
const PointsController = require( "./controllers/pointsController" );
const UserController = require( "./controllers/userController" );
const { verifyUserMiddleware } = require( "./controllers/util" );
const { startApolloServer } = require( "./src" );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use( cookieParser() )

app.use( express.static( "client/build" ) );

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/giddyitupDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} );

const connection = mongoose.connection;

connection.on( "connected", () => {
  console.log( "Mongoose successfully connected." );
} );

connection.on( "error", ( err ) => {
  console.log( "Mongoose connection error: ", err );
} );

//tester
app.get( "/api/config", ( req, res ) => {
  res.json( {
    success: true,
  } );
} );

app.use( "/api/parent", verifyUserMiddleware, ParentController );
app.use( "/api/child", verifyUserMiddleware, ChildController );
app.use( "/api/tasks", verifyUserMiddleware, TaskController );
app.use( "/api/user", UserController );
app.use( "/api/points", verifyUserMiddleware, PointsController );

// app.get( "*", ( req, res ) => {
//   res.sendFile( path.join( __dirname, "./client/build/index.html" ) );
// } );

// app.listen( PORT, () => {
//   console.log( `App is running on http://localhost:${PORT}` );
// } );



main = async ( { connection } ) => {

  const typeDefs = require( './src/gql/index' );
  const resolvers = require( "./src/gql/resolvers" )

  const expressApp = app;

  const apolloServer = await startApolloServer( {
    expressApp, typeDefs, resolvers, port: PORT,
    connection,
  } );

  // serve UI

  // if ( process.env.NODE_ENV === 'development' )
  //   expressApp.use( express.static( path.join( __dirname, './', 'client', 'build' ) ) )
  // else
  //   expressApp.use( express.static( path.join( __dirname, './', 'client' ) ) )

  expressApp.get( "*", ( req, res ) => {
    res.sendFile( path.join( __dirname, "./client/build/index.html" ) );
  } );

  return { expressApp, apolloServer }

}

main( { connection } )