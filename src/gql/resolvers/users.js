const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const { JWT_SECRET, JWT_EXPIRY } = require( "../../../const" )

const db = require( "../../../models" )

const modelToJSON = ( mongooseModel ) => {
  // console.log( 'User:', mongooseModel )
  return {
    id: mongooseModel._id,
    ...mongooseModel.toJSON(),
    password: '',
  }
}

const me = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const user = await db.User.findOne( { email: context.authUser.email } )
  return modelToJSON( user )
}

const users = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const users = await db.User.find( {} )
  return users.map( modelToJSON )
}

const user = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - user not available'

  const user = await db.User.findById( args.id )
  return modelToJSON( user )
}

const updateUser = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - child not available'

  try {
    const { firstName, lastName, email } = args.data
    const user = await db.User.findByIdAndUpdate( args.id, {
      firstName, lastName, email
    }, { new: true } )
    return modelToJSON( user )
  } catch ( e ) {
    console.log( e )
    throw 'Unable to update the User'
  }
}

const deleteUser = async ( parent, args, context, info ) => {
  if ( !context.isLoggedIn ) throw '401 - child not available'

  try {
    const user = await db.User.findByIdAndDelete( args.id )
    return modelToJSON( user )
  } catch ( e ) {
    throw 'Unable to delete the User'
  }
}

const login = async ( parent, args, context, info ) => {
  const { email, password } = args

  const foundUser = await db.User.findOne( { email } )
  if ( !foundUser ) throw Error( 'User not found' )

  const matched = await bcrypt.compare( password, foundUser.get( 'password' ) )
  if ( !matched ) throw Error( 'Password mismatch' )

  const user = modelToJSON( foundUser )
  // console.log( user )
  const token = jwt.sign( user, JWT_SECRET, { expiresIn: JWT_EXPIRY } )

  return {
    user,
    token,
  }

}

module.exports = {
  Query: {
    me,
    user,
    users,
    login,
  },
  Mutation: {
    updateUser,
    deleteUser,
  },
  modelToJSON,
}

/*
* Sample GQL Queries

query login {
  login(email: "h@g.com", password: "test") {
    user {
      id
      password
      fullName
    }
    token
  }
}

*/