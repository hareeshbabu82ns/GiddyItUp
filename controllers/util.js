const db = require( "../models" );
const jwt = require( 'jsonwebtoken' );
const { JWT_SECRET } = require( "../const" );

async function verifyUserFromRequest( req ) {
  // console.log( JSON.stringify( req.cookies ) )
  const authToken = req.cookies.Authorization || ( req.headers[ 'Authorization' ] || req.headers.authorization )
  // console.log( authToken )
  if ( !authToken ) return { isLoggedIn: false }
  const authJWT = authToken.split( 'Bearer ' )[ 1 ]
  // console.log( authJWT )
  if ( authJWT ) {
    const decoded = jwt.verify( authJWT, JWT_SECRET );
    const user = await db.User.findOne( { email: decoded.email } )
    // console.log( JSON.stringify( user ) )
    return { isLoggedIn: !!user, user: { id: user._id, email: user.email, } }
  }
}

verifyUserMiddleware = async ( req, res, next ) => {
  try {
    const { isLoggedIn, user } = await verifyUserFromRequest( req )
    // console.log( "verifyUserMiddleware: isLoggedIn: ", isLoggedIn )
    if ( isLoggedIn ) {
      req.auth = user
      next()
    } else {
      throw 'user not found'
    }
  } catch ( e ) {
    // console.log( "verifyUserMiddleware: returning 401" )
    res.status( 401 ).send( 'Token verfication failed' )
  }
}

module.exports = { verifyUserFromRequest, verifyUserMiddleware }